import ExpertiseSelector from "./ExpertiseSelector";

const DevOps = () => {
	const topics = {
		Beginner: ["Agile", "CI CD", "Version control", "automated testing", "cloud computing", "logging", "Docker", "Deployment", "SaaS", "Virtual Machines", "scaling", "DevOps culture", "blue-green deployment", "Microservices"],
		Intermediate: ["Kubernetes", "Infrastructure as Code", "services mesh", "Serverless", "roll back", "optimization", "events", "asynchronous", "API", "viewport", "testing", "transitions"],
		Expert: ["scalability", "cloud-native architecture", "monitoring", "CI/CD pipelines", "container orchestration", "microservices architecture", "distributed systems", "automation", "infrastructure management"],
	};

	return <ExpertiseSelector topics={topics} title="DevOps" redirectPath="/dashboard/questions" />;
};

export default DevOps;
