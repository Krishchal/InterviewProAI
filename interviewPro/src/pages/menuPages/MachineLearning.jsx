import ExpertiseSelector from "./ExpertiseSelector"; // Reusable component for expertise selection

const MachineLearning = () => {
	// Define topics for Machine Learning
	const topics = {
		Beginner: ["Supervised Learning", "Unsupervised Learning", "Linear Regression", "Logistic Regression", "Decision Trees", "K-Nearest Neighbors"],
		Intermediate: ["Support Vector Machines", "Naive Bayes", "Random Forests", "K-Means Clustering", "Dimensionality Reduction", "PCA", "Neural Networks", "Gradient Boosting"],
		Expert: ["Deep Learning", "Convolutional Neural Networks", "Recurrent Neural Networks", "Generative Adversarial Networks", "Reinforcement Learning", "Transfer Learning", "AI Ethics"],
	};

	return <ExpertiseSelector topics={topics} title="Machine Learning" redirectPath="/dashboard/questions" />;
};

export default MachineLearning;
