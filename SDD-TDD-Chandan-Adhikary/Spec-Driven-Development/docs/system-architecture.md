# System Architecture & System Design Specification

> **Document class:** Living feature/specification  
> **Framework:** SDD  
> **Guideline baseline:** 2.0.0  
> **Status:** Template; project-specific instantiation requires review  

## Purpose

High-level and low-level system designs, architectural patterns, boundary contracts, scalability, data consistency, reliability, and technical trade-offs.

## Agent read trigger

**MUST** read or consult this file: Prior to module creation, architectural modifications, database schema modeling, API contract definition, or cross-cutting infrastructure changes.

---

## 1. System Design Architecture (HLD & LLD)

### 1.1 High-Level Design (HLD)
The High-Level Design outlines the end-to-end topological boundaries, ingress traffic flows, microservices / modular monolith components, and peripheral infrastructure.

```mermaid
flowchart TB
    classDef client fill:#0f172a,stroke:#38bdf8,stroke-width:1.5px,color:#f8fafc;
    classDef edge fill:#1e1b4b,stroke:#818cf8,stroke-width:1.5px,color:#e0e7ff;
    classDef gw fill:#1e293b,stroke:#94a3b8,stroke-width:1.5px,color:#f8fafc;
    classDef app fill:#082f49,stroke:#0284c7,stroke-width:1.5px,color:#f0f9ff;
    classDef data fill:#022c22,stroke:#10b981,stroke-width:1.5px,color:#d1fae5;
    classDef cache fill:#451a03,stroke:#fbbf24,stroke-width:1.5px,color:#fffbeb;

    subgraph IngressLayer ["🌐 INGRESS & EDGE SECURITY BOUNDARY"]
        direction LR
        subgraph Clients ["CLIENT VIEWPORTS"]
            Browser(["<b>🖥️ Web Clients</b><br/><small>SPA & SSR Viewports</small>"]):::client
            MobileApp(["<b>📱 Mobile Clients</b><br/><small>iOS / Android Shells</small>"]):::client
            ExternalAPI(["<b>🏢 B2B Partners</b><br/><small>Third-Party Integrations</small>"]):::client
        end

        subgraph Edge ["EDGE SECURITY"]
            DNS["<b>🌐 Anycast DNS</b><br/><small>Route 53 / Cloudflare</small>"]:::edge
            WAF["<b>🛡️ WAF & Shield</b><br/><small>TLS Term & DDoS Guard</small>"]:::edge
            CDN["<b>⚡ Static CDN</b><br/><small>Edge Compute & Cache</small>"]:::edge
        end

        subgraph Gateway ["ROUTING GATEWAY"]
            APIGateway["<b>🔀 API Gateway</b><br/><small>Reverse Proxy Router</small>"]:::gw
            AuthFilter["<b>🔑 Auth Filter</b><br/><small>JWT & Session Guard</small>"]:::gw
        end
    end

    subgraph CoreDataLayer ["⚙️ CORE APPLICATION & PERSISTENCE TIERS"]
        direction LR
        subgraph AppTier ["APPLICATION CORE"]
            CoreService["<b>⚙️ Core Server</b><br/><small>Modular Monolith</small>"]:::app
            AsyncWorker["<b>🏃 Worker Pool</b><br/><small>Background Jobs</small>"]:::app
            Telemetry["<b>📊 Observability</b><br/><small>OTel & Winston Logs</small>"]:::app
        end

        subgraph DataTier ["PERSISTENCE & CACHE"]
            PrimaryDB[("<b>🗄️ Primary DB</b><br/><small>PostgreSQL ACID</small>")]:::data
            ReadReplica[("<b>📑 Read Nodes</b><br/><small>Query Offloading</small>")]:::data
            RedisCache[("<b>⚡ Redis Store</b><br/><small>Session & Rate Limits</small>")]:::cache
            MsgQueue[("<b>📨 Message Broker</b><br/><small>Kafka / Streams</small>")]:::cache
            BlobStore[("<b>📦 Object Store</b><br/><small>S3 / GCS Buckets</small>")]:::data
        end
    end

    Clients -->|"DNS"| DNS
    DNS -->|"TLS Term"| WAF
    WAF -->|"Edge Cache"| CDN
    CDN -->|"API Requests"| APIGateway
    APIGateway -->|"Bearer Token"| AuthFilter
    AuthFilter ==>|"Session Scoped"| CoreService

    CoreService -->|"ACID Writes"| PrimaryDB
    PrimaryDB -.->|"Replication"| ReadReplica
    CoreService -->|"Read Queries"| ReadReplica
    CoreService -->|"Cache Check"| RedisCache
    CoreService -->|"Publish"| MsgQueue

    MsgQueue -->|"Process"| AsyncWorker
    AsyncWorker -->|"Batch Sync"| PrimaryDB
    AsyncWorker -->|"Assets"| BlobStore
    CoreService -->|"Uploads"| BlobStore

    CoreService -.->|"Traces"| Telemetry
    AsyncWorker -.->|"Metrics"| Telemetry
```

### 1.2 Low-Level Design (LLD)
The Low-Level Design defines class and module boundaries, interface segregation, state machines, and design patterns:

- **Clean Architecture Layers:**
  1. **Domain Layer:** Pure business entities, value objects, and domain exceptions (zero framework dependencies).
  2. **Application / Use Case Layer:** Orchestration workflows, DTOs, and input boundary interfaces.
  3. **Infrastructure Layer:** Database repositories, external API clients, messaging adapters, and cache implementations.
  4. **Presentation / Interface Layer:** Controllers, API route handlers, GraphQL resolvers, and serializers.

- **Design Patterns Enforced:**
  - **Repository Pattern:** Abstracting storage engines behind deterministic interfaces.
  - **Dependency Injection (DI):** Inverting control to guarantee testability and mockability.
  - **Factory & Strategy Patterns:** Decoupling algorithm variants (e.g. multi-provider payment or auth handlers).
  - **Unit of Work:** Transactional coordination across multiple entity aggregates.

---

## 2. Scalability, Partitioning & Load Balancing

| Dimension | Strategy & Implementation Standard |
|---|---|
| **Horizontal Scaling** | Stateless application tier scaled horizontally behind L7 Round-Robin / Least-Connections load balancers with auto-scaling triggers (CPU > 70% or P95 Latency > 250ms). |
| **Database Scaling** | CQRS separation: Writes routed to Primary RDBMS; read-heavy queries routed across Read Replicas with connection pooling (e.g., PgBouncer). |
| **Data Partitioning / Sharding** | Hash or range partitioning based on `tenant_id` or `created_at` for high-volume audit logs and transaction ledgers. |
| **Connection Pooling** | Enforced client-side connection limits with eager health checks and graceful reconnection timeouts. |

---

## 3. Data Consistency, Transactions & CAP Theorem Trade-Offs

### 3.1 Consistency Strategy
- **Relational Data (RDBMS):** Enforce strict **ACID** properties for critical business logic (billing, accounts, core state mutations) with explicit isolation levels (default: `READ COMMITTED`, critical ledger: `SERIALIZABLE`).
- **Distributed State & Analytics (BASE):** Enforce **Eventual Consistency** for non-blocking read models, search indices, and activity feeds.
- **Idempotency Keys:** All mutating HTTP requests (`POST / PUT / PATCH`) accept a unique `Idempotency-Key` header stored in Redis with an auto-expiring TTL to prevent duplicate execution.

```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant GW as API Gateway
    participant Core as Core Service
    participant Cache as Redis (Idempotency)
    participant DB as Primary DB
    participant MQ as Message Broker

    Client->>GW: POST /api/v1/orders (Idempotency-Key: X)
    GW->>Core: Forward request
    Core->>Cache: Check key "idemp:X"
    alt Key already exists & resolved
        Cache-->>Core: Cached response payload
        Core-->>Client: 200 OK (Idempotent response)
    else Key is new
        Core->>Cache: Acquire distributed lock "lock:X" (TTL: 10s)
        Core->>DB: Execute ACID transaction
        DB-->>Core: Commit successful
        Core->>MQ: Publish OrderCreatedEvent
        Core->>Cache: Save final response & release lock
        Core-->>Client: 201 Created (Order confirmed)
    end
```

---

## 4. Multi-Layer Caching Architecture & Invalidation

1. **Layer 1: Browser / Client:** Cache-Control headers (`stale-while-revalidate`, immutable content hashes for bundles).
2. **Layer 2: Edge CDN:** Static assets, public marketing pages, and regional SSR caching.
3. **Layer 3: Application In-Memory / Distributed Cache (Redis):**
   - **Pattern:** **Cache-Aside** (Read: cache check -> DB fallback -> populate cache; Write: DB write -> cache invalidate).
   - **TTL Enforced:** Every cached item MUST have an explicit Time-To-Live (TTL) to avoid permanent cache pollution.
   - **Eviction Policy:** `allkeys-lru` with memory ceiling alarms.

---

## 5. Asynchronous Processing & Event-Driven Architecture

- **Message Queues:** Message brokers (Kafka / RabbitMQ / Redis Streams) handle decoupled background operations (emails, PDF generation, webhook dispatches, analytical ETL).
- **Dead-Letter Queues (DLQ):** Messages failing after 3 exponential backoff retries are moved to a designated DLQ for inspection.
- **Outbox Pattern:** Guarantee at-least-once message delivery by writing domain events to an `outbox` table within the primary DB transaction before emitting to the message broker.

---

## 6. Resilience, Fault Tolerance & Security Boundaries

```mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open: Failures > Threshold (e.g., 50% errors in 10s)
    Open --> HalfOpen: Sleep Window expires (e.g., 30s)
    HalfOpen --> Closed: Probe requests succeed (e.g., 3 consecutive)
    HalfOpen --> Open: Any probe request fails
```

- **Circuit Breakers:** Guard all outbound third-party calls (payment gateways, external APIs).
- **Rate Limiting:** Token Bucket or Leaky Bucket algorithm at the API Gateway per client IP and authenticated `user_id`.
- **Graceful Degradation:** Fall back to cached or default responses when peripheral dependencies fail.
- **Zero-Trust Security:** Mutual TLS (mTLS) for inter-service communication, scoped JWT validation, strict CORS whitelist, and parameterized SQL queries exclusively.

---

## 7. Repository Structure & Boundary Contracts

```text
[project-root]/
├── docs/                     # Specifications, architecture, PRD, and guidelines
├── playbooks/                # Step-by-step operational workflows
├── logs/                     # Mandatory development logs (*.log)
├── .agents/                  # Autonomous commands, skills, and templates
│   ├── commands/             # Custom deterministic slash command contracts
│   └── skills/               # Core repository skills
├── [application-modules]/    # Segregated application code
└── tests/                    # Unit, integration, and contract test suites
```

---

## 8. Normative Enforcement Rules

- **MUST** complete domain knowledge synthesis and system design modeling before Step 5 (First Prompting); if not manually provided, consult the AI agent during planning to formulate system architecture and integrate it into Prompt 1.
- **MUST** follow staged web development (Frontend-First Verification): develop and verify frontend design and features during a demo run before backend persistence.
- **MUST** maintain all development logs inside `logs/` (`logs/*.log`) with credentials sanitized.
- **MUST** document any architectural change via an Architecture Decision Record (ADR) under `docs/adrs/`.
- **MUST** maintain up-to-date visual Mermaid diagrams matching deployed infrastructure.
- **MUST** stop and review if an implementation conflicts with approved boundary contracts or scalability constraints.

## Evidence and change control

- **MUST** record owner, revision/date, relevant approval reference, and traceable evidence in the applicable project instantiation.
- **MUST** route changes to process rules through `docs/guideline-CHANGELOG.md` and formal baseline revision; route feature behavior through approved versioned specs and `docs/CHANGELOG.md`.
- **SHOULD** keep links to canonical artifacts instead of duplicating definitions.

## SDD enforcement

- **MUST** verify the latest approved feature spec version before changing implementation.
- **MUST** stop if this document conflicts with approved guidelines; pursue a guideline revision rather than an implicit exception.
