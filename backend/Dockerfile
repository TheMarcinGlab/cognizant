# ── Build Stage with Maven + Temurin 21 ──
FROM maven:3.9.8-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Cache POM & Maven wrapper
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN mvn dependency:go-offline

# Copy sources & package
COPY src ./src
RUN mvn package -DskipTests

# ── Run Stage with Temurin 21 JDK ──
FROM eclipse-temurin:21-jdk
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
