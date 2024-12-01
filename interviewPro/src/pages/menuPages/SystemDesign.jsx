import ExpertiseSelector from "./ExpertiseSelector"; // Reusable expertise selection component

const SystemDesign = () => {
	// Define the topics for System Design
	const topics = {
		Beginner: ["System Design Basics", "Scalability", "Load Balancing", "Database Sharding", "Caching", "Horizontal Scaling"],
		Intermediate: ["Microservices", "CAP Theorem", "API Gateway", "Event Sourcing", "Service Discovery", "Data Consistency"],
		Expert: ["Distributed Systems", "Fault Tolerance", "Event-Driven Architecture", "CQRS", "Domain-Driven Design", "Scalable Architecture"],
	};

	return <ExpertiseSelector topics={topics} title="System Design" redirectPath="/dashboard/questions" />;
};

export default SystemDesign;
