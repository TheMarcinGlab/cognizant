Getting Started
To start the application, navigate to the project directory and run:
docker-compose up --build


1. General Architecture
Backend: Java Spring Boot, using reactive programming (Project Reactor: Flux/Mono), exposing a REST API.

Frontend: Angular, based on RxJS for data stream management and reactivity.

Database: Managed with JPA/Spring Data repositories (supports relational or other types, depending on configuration).

2. Asynchronous Notifications (Backend – NotificationService)
Mechanism:
Notifications are sent after task updates using Server-Sent Events (SSE) with a reactive approach (Sinks.Many, Flux).

Workflow:
NotificationService creates an event stream that the frontend can subscribe to in real time.

Non-blocking:
Each task modification (e.g., update) emits an event without blocking the main thread or HTTP request.

Key Benefits:

No blocking—notification sending does not impact API response time.

SSE is simpler and more maintainable than WebSockets for one-way notifications.

Reactive streams (Flux/Mono) provide scalability and performance.

3. RxJS Integration on the Frontend (Angular)
The frontend subscribes to the SSE endpoint (/api/notifications/sse) to receive real-time notifications (displayed as snackbars/pop-ups).

Task data is fetched via Angular services as RxJS Observables.

These Observables can be combined with other data streams (e.g., labels).

Filtering: After combining, RxJS operators (filter, map) remove unnecessary or irrelevant entries (such as archived tasks).

4. Design & UX/UI
Stack: Angular + Angular Material for fast, aesthetically pleasing user interfaces.

UX: Snackbars/pop-ups are shown immediately upon SSE events—delivering excellent user experience.

Testing: Sample data and API endpoints are provided for testing and development in file init.sql

5. Easy Verification
Backend: Transparent REST and SSE endpoints for API testing.

Frontend: Effortless verification of notification flow and reactive data fetching/filtering—just update a task and observe real-time UI changes.