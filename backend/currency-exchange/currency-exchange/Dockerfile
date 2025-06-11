# Use lightweight OpenJDK base image
FROM openjdk:17-jdk-slim

# Set application JAR file path (replace if needed)
ARG JAR_FILE=target/currency-exchange-0.0.1-SNAPSHOT.jar

# Copy JAR into the container
COPY ${JAR_FILE} app.jar

# Expose default Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "/app.jar"]
