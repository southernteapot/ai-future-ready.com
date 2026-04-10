---
title: "AI Glossary"
type: glossary
description: "Plain-English definitions of 80+ AI and machine learning terms. From AGI to Zero-Shot Learning."
last_updated: "2026-04-10"
---

# AI Glossary

Plain-English definitions of key AI and machine learning terms.

## Core Concepts

### Alignment

The research and engineering challenge of ensuring AI systems behave in ways that are consistent with human values and intentions. Alignment work aims to prevent AI from pursuing goals that are harmful or unintended, especially as models become more capable. It encompasses both technical methods like RLHF and broader safety frameworks.

### Benchmark

A standardized test or dataset used to measure and compare the performance of AI models on specific tasks. Benchmarks like MMLU (general knowledge), HumanEval (coding), and GSM8K (math) help researchers and users understand a model's strengths and weaknesses relative to other models.

### Bias

Systematic errors or unfair preferences in an AI model's outputs, often reflecting biases present in its training data or design choices. For example, a model trained mostly on English text may perform poorly for other languages. Identifying and mitigating bias is a critical challenge in building fair and responsible AI systems.

### Classification

A fundamental machine learning task where the model assigns input data to one or more predefined categories. Examples include spam detection (spam or not spam), sentiment analysis (positive, negative, or neutral), and image recognition (cat, dog, car). Classification models are among the most widely deployed AI systems.

### Embedding

A way of representing text, images, or other data as a list of numbers (a vector) that captures its meaning. Similar items end up with similar number patterns, allowing AI to understand relationships. Embeddings power semantic search, recommendation systems, and are the foundation of how models understand language internally.

### Guardrails

Safety mechanisms built into AI systems to prevent harmful, biased, or inappropriate outputs. Guardrails can include content filters, output validation rules, topic restrictions, and monitoring systems. They help ensure AI applications behave responsibly and within acceptable boundaries when deployed to real users.

### Hallucination

When an AI model generates information that sounds plausible but is factually incorrect or entirely made up. For example, a model might cite a research paper that doesn't exist or confidently state incorrect historical dates. Hallucinations are a major challenge in AI and why it's important to verify AI-generated content, especially for factual claims.

### Inference

The process of using a trained AI model to generate predictions or outputs from new input data. When you send a message to ChatGPT and it responds, that's inference. Inference speed and cost are key practical considerations since inference is what happens every time someone uses a deployed model.

### Machine Learning

A branch of AI where systems learn patterns from data rather than being explicitly programmed with rules. Instead of writing "if temperature > 100, then alert," you feed the system thousands of examples and it learns to recognize patterns on its own. Machine learning encompasses supervised, unsupervised, and reinforcement learning approaches.

### Natural Language Processing (NLP)

The field of AI focused on enabling computers to understand, interpret, and generate human language. NLP powers everything from spell-checkers and search engines to chatbots and real-time translation. Modern NLP has been transformed by large language models, which achieve remarkable language understanding without task-specific engineering.

### Token

The basic unit of text that language models process. A token can be a whole word, part of a word, or a punctuation mark. For English, one token is roughly three-quarters of a word, so 1,000 tokens equals about 750 words. Models have limits on how many tokens they can process at once (the context window), and API pricing is typically per token.

### Deep Learning

A subset of machine learning that uses neural networks with many layers (hence "deep") to learn complex patterns from data. Deep learning has driven most of the recent breakthroughs in AI, from image recognition and speech synthesis to language models and game playing. It requires substantial data and compute but achieves remarkable results.

### Emergent Behavior

Capabilities that appear in AI models at large scale but were not explicitly programmed or expected. For example, large language models developed the ability to perform arithmetic, translate between languages, and write code, even though they were only trained to predict the next word. Emergent behaviors often appear suddenly as models grow larger.

### GPU

Graphics Processing Unit, originally designed for rendering video game graphics but now the primary hardware for training and running AI models. GPUs excel at the parallel math operations that neural networks require. NVIDIA's GPUs dominate AI computing, and access to GPU clusters is one of the biggest bottlenecks in AI development.

### Scaling Laws

Empirical observations showing that AI model performance improves predictably as you increase the model size, dataset size, and amount of compute used for training. Scaling laws have guided the development of increasingly large models and help researchers predict performance before committing resources to training.

## Model Architecture

### Attention Mechanism

A technique that allows a model to focus on the most relevant parts of its input when producing output. For example, when translating a sentence, the model can "attend" to specific words that matter most for the current word being translated. Attention is the key innovation behind the Transformer architecture that powers modern LLMs.

### Autoregressive Model

A model that generates output one piece at a time, where each new piece is predicted based on all the pieces that came before it. GPT and other large language models work this way, predicting the next token in a sequence. This is why these models generate text from left to right, one word at a time.

### BERT

Bidirectional Encoder Representations from Transformers, a model developed by Google in 2018. Unlike GPT which reads text left-to-right, BERT reads in both directions simultaneously, making it especially good at understanding the meaning of text. BERT is widely used for tasks like search, text classification, and question answering.

### Context Window

The maximum amount of text (measured in tokens) that a model can consider at one time, including both the input you provide and the output it generates. A model with a 128K token context window can process roughly 100,000 words at once. Larger context windows enable working with longer documents but may increase cost and latency.

### Decoder

The part of a Transformer model responsible for generating output. In a text generation model like GPT, the decoder takes in a sequence of tokens and predicts what comes next. Some models (like GPT) use only a decoder, while others (like the original Transformer) pair a decoder with an encoder.

### Diffusion Model

A type of generative AI model that creates data (usually images) by starting with random noise and gradually refining it into a coherent output. Models like Stable Diffusion, DALL-E, and Midjourney use this approach. The model learns to reverse a "noising" process, step by step converting static into a detailed image.

### Encoder

The part of a Transformer model that processes input and creates an internal representation of its meaning. BERT is an encoder-only model, making it great at understanding text. In encoder-decoder models like T5, the encoder processes the input and the decoder generates the output based on that understanding.

### GANs

Generative Adversarial Networks are a type of AI architecture where two neural networks compete against each other: a generator creates synthetic data and a discriminator tries to tell it apart from real data. Through this adversarial process, the generator learns to create increasingly realistic outputs. GANs were revolutionary for image generation before diffusion models became dominant.

### GPT

Generative Pre-trained Transformer, a family of large language models created by OpenAI. GPT models are trained to predict the next word in a sequence and can generate remarkably human-like text. The architecture has been the foundation for ChatGPT and has influenced the entire field of generative AI.

### Latent Space

A compressed, abstract representation of data that a model learns internally. In this space, similar concepts are positioned near each other. For image generators, the latent space is where the "idea" of an image exists before being decoded into actual pixels. Understanding latent space helps explain how AI models organize and relate concepts.

### Mixture of Experts (MoE)

A model architecture where multiple specialized sub-networks ("experts") exist within a single model, and a routing mechanism selects which experts to activate for each input. This means only a fraction of the model's total parameters are used per query, making it faster and cheaper to run. Models like Mixtral and Llama 4 use MoE architecture.

### Neural Network

A computing system loosely inspired by the structure of the human brain, composed of layers of interconnected nodes (neurons) that process information. Each connection has a weight that adjusts during training. Deep neural networks (with many layers) are the foundation of modern AI, powering everything from image recognition to language generation.

### Parameters

The internal numerical values (weights and biases) that a model learns during training. The number of parameters is often used as a rough measure of model size and capability. GPT-4 is estimated to have over a trillion parameters, while smaller models like Llama 3.1 8B have 8 billion. More parameters generally means more capacity to learn complex patterns.

### Transformer

The neural network architecture introduced in the landmark 2017 paper "Attention Is All You Need" that underlies virtually all modern large language models. Transformers use self-attention mechanisms to process all parts of an input simultaneously rather than sequentially, enabling massive parallelism and superior handling of long-range dependencies in text.

### Self-Attention

A mechanism within Transformers where each element in a sequence computes how relevant every other element is to it. This allows the model to capture relationships between distant words in a sentence, such as understanding that "it" in a paragraph refers to a subject mentioned several sentences earlier.

### Tokenizer

The component that converts raw text into tokens (numbers) that a model can process, and converts the model's numerical output back into readable text. Different models use different tokenizers, which is why token counts vary between models for the same text. The tokenizer is a crucial but often overlooked part of the AI pipeline.

### Weight

A numerical value in a neural network that determines how strongly one neuron influences another. During training, the model adjusts its millions or billions of weights to produce better outputs. The collection of all weights is what defines what a model "knows," and model weights are what you download when you use an open-source model.

## Training & Fine-tuning

### Batch Size

The number of training examples a model processes together before updating its internal parameters. A larger batch size can make training more stable and efficient, but requires more memory. Choosing the right batch size is an important trade-off in model training.

### Corpus

A large, structured collection of text used to train or evaluate language models. A training corpus might include books, websites, academic papers, and code repositories. The quality, size, and diversity of a corpus heavily influence what the resulting model knows and how well it performs.

### Epoch

One complete pass through the entire training dataset during model training. Models are typically trained for multiple epochs, meaning they see the same data several times. Too few epochs leads to underfitting (the model hasn't learned enough), while too many can cause overfitting (the model memorizes the data instead of learning patterns).

### Fine-Tuning

The process of taking a pre-trained model and training it further on a specific, smaller dataset to improve its performance on a particular task or domain. For example, fine-tuning a general language model on medical texts to create a model that excels at medical questions. It's much cheaper and faster than training from scratch.

### Hyperparameter

A setting that controls how a model is trained, as opposed to the parameters the model learns on its own. Examples include the learning rate (how big the adjustments are during training), batch size, and number of epochs. Choosing good hyperparameters is crucial for training effective models and is often more art than science.

### Knowledge Distillation

A technique for creating a smaller, faster model that mimics the behavior of a larger, more capable one. The large "teacher" model's outputs are used to train the smaller "student" model. This allows deploying AI in resource-constrained environments like mobile phones while retaining much of the original model's capabilities.

### LoRA

Low-Rank Adaptation, a popular and efficient fine-tuning technique that modifies only a small portion of a model's parameters rather than the entire model. LoRA makes it practical to customize large models on modest hardware by adding small trainable layers. It dramatically reduces the cost and compute required for fine-tuning.

### Overfitting

When a model learns its training data too well, memorizing specific examples rather than learning general patterns. An overfit model performs great on training data but poorly on new, unseen data. It's like a student who memorizes test answers without understanding the subject. Techniques like regularization, dropout, and data augmentation help prevent overfitting.

### Perplexity

A metric that measures how well a language model predicts text. Lower perplexity means the model is less "surprised" by the text it encounters, indicating better language understanding. Perplexity is commonly used to evaluate and compare language models during training and research, though it doesn't always correlate with usefulness in practice.

### Pre-Training

The initial, large-scale training phase where a model learns general knowledge from a massive dataset, typically the broad internet. Pre-training teaches the model language, facts, reasoning patterns, and world knowledge. This phase is extremely expensive (millions of dollars for large models) and creates the foundation model that can later be fine-tuned for specific tasks.

### Quantization

A technique for reducing the memory and compute requirements of an AI model by using lower-precision numbers to represent its parameters. For example, converting from 16-bit to 4-bit numbers can make a model four times smaller with minimal quality loss. Quantization is essential for running large models on consumer hardware and mobile devices.

### Reinforcement Learning

A training approach where an AI agent learns by taking actions in an environment and receiving rewards or penalties based on outcomes. The agent learns to maximize its total reward over time through trial and error. Reinforcement learning powers game-playing AI (like AlphaGo) and is used to improve language model behavior.

### Reinforcement Learning from Human Feedback (RLHF)

A training technique where human evaluators rate different AI outputs, and that feedback is used to train the model to produce responses humans prefer. RLHF is a key step in making raw language models helpful, honest, and safe. It's how models learn to be useful assistants rather than just text predictors.

### Supervised Learning

A machine learning approach where the model is trained on labeled data, meaning each training example comes with the correct answer. The model learns to map inputs to outputs by studying thousands of input-answer pairs. This is the most common type of machine learning and powers applications like email spam filters and image classifiers.

### Transfer Learning

The practice of taking knowledge a model learned from one task and applying it to a different but related task. For example, a model trained on millions of web pages already understands language, so it can be quickly adapted to answer medical questions with relatively little medical data. Transfer learning makes AI practical by avoiding training from scratch every time.

### Unsupervised Learning

A machine learning approach where the model finds patterns in data without any labeled examples or correct answers to guide it. The model discovers structure on its own, such as grouping similar customers together or finding anomalies in network traffic. Pre-training of language models on raw text is a form of unsupervised (or self-supervised) learning.

### Catastrophic Forgetting

A problem in neural networks where learning new information causes the model to forget previously learned knowledge. When you fine-tune a model on a new task, it might lose some of its original capabilities. Techniques like LoRA and careful learning rate selection help minimize catastrophic forgetting during fine-tuning.

### Data Augmentation

Techniques for artificially expanding a training dataset by creating modified versions of existing data. For images, this might mean rotating, flipping, or adjusting colors. For text, it could involve paraphrasing or back-translation. Data augmentation helps models generalize better, especially when the original dataset is small.

### Learning Rate

A hyperparameter that controls how much a model adjusts its weights in response to errors during training. Too high a learning rate causes the model to overshoot optimal values and become unstable. Too low, and training becomes extremely slow. Finding the right learning rate is one of the most important decisions in model training.

### Synthetic Data

Artificially generated data used to train or evaluate AI models when real data is scarce, expensive, or sensitive. AI models themselves are increasingly used to generate synthetic training data. While synthetic data can greatly expand training sets, care must be taken to ensure it accurately represents real-world scenarios.

## Prompting & Usage

### Chain-of-Thought

A prompting technique where you ask the AI to "think step by step" rather than jumping straight to an answer. By reasoning through intermediate steps, the model is more likely to arrive at correct conclusions, especially for math, logic, and complex reasoning tasks. This approach is also used internally by reasoning models like OpenAI's o3.

### Few-Shot Learning

A technique where you provide the AI with a handful of examples in your prompt to demonstrate what you want. For instance, showing three examples of how to format data before asking it to format new data. This helps the model understand the pattern without requiring any retraining. Contrast with zero-shot (no examples) and fine-tuning (extensive retraining).

### Grounding

Connecting an AI model's responses to verified, factual sources of information rather than relying solely on its training data. Grounding techniques include retrieval-augmented generation (RAG), tool use, and web search. Grounded responses are more trustworthy because they can be traced back to specific sources.

### In-Context Learning

A model's ability to learn new tasks or adapt its behavior based on the information and examples provided in the prompt, without any changes to its underlying weights. When you give ChatGPT a few examples of a task and it follows the pattern, that's in-context learning. This emergent ability is one of the most powerful features of large language models.

### Prompt Engineering

The skill of crafting effective instructions and context for AI models to get the best possible outputs. Good prompts are clear, specific, and include relevant context. Techniques include few-shot examples, chain-of-thought reasoning, role-playing, and structured formatting. Prompt engineering is one of the most practical AI skills anyone can learn.

### RAG (Retrieval-Augmented Generation)

A technique that enhances AI responses by first searching a knowledge base for relevant information, then providing that information to the model as context for generating its answer. RAG reduces hallucinations and lets models access up-to-date or specialized information without retraining. It's one of the most popular patterns for building reliable AI applications.

### Semantic Search

A search approach that finds results based on the meaning of a query rather than just matching keywords. If you search for "how to fix a slow computer," semantic search understands you want troubleshooting tips even if results don't contain those exact words. It relies on embeddings to understand and match concepts.

### System Prompt

A set of instructions given to an AI model that defines its behavior, personality, and constraints for an entire conversation. The system prompt is typically set by the application developer, not the end user. For example, a customer support bot might have a system prompt telling it to be polite, stay on topic, and never discuss competitors.

### Temperature

A setting that controls how random or creative a model's outputs are. A low temperature (like 0) makes the model more deterministic and focused, always picking the most likely next word. A high temperature (like 1.0 or above) makes outputs more varied, creative, and surprising. Lower temperatures are better for factual tasks; higher for creative writing.

### Vector Database

A specialized database designed to store and efficiently search through embeddings (numerical representations of data). When you search for "comfortable shoes for running," a vector database can find relevant products even if they're described differently. Vector databases like Pinecone, Weaviate, and ChromaDB are essential infrastructure for RAG and semantic search applications.

### Zero-Shot Learning

A model's ability to perform a task it was never specifically trained or given examples for. For instance, asking a language model to classify movie reviews as positive or negative without showing it any examples first. Strong zero-shot performance is a hallmark of capable foundation models and is what makes modern AI so versatile out of the box.

### Prompt Chaining

A technique where you break a complex task into multiple steps, using the output of one AI prompt as the input for the next. For example, first asking the AI to outline an article, then asking it to write each section using that outline. Prompt chaining produces more reliable and higher-quality results than trying to do everything in a single prompt.

### Retrieval

The process of finding and fetching relevant information from a knowledge base or document collection to provide context for an AI model. Retrieval is the "R" in RAG and is essential for giving models access to current, specialized, or private information that wasn't part of their training data.

### Top-k / Top-p Sampling

Strategies for controlling which tokens a model considers when generating text. Top-k limits choices to the k most likely next tokens, while Top-p (also called nucleus sampling) includes tokens until their cumulative probability reaches p. These settings, along with temperature, let you balance between creativity and predictability in AI outputs.

## Types of AI

### AGI

Artificial General Intelligence refers to a hypothetical AI system that can understand, learn, and apply knowledge across any intellectual task a human can perform. Unlike today's AI, which excels at specific tasks, AGI would be able to reason broadly and adapt to entirely new situations without special training.

### AI Agent

An AI system that can autonomously plan and execute multi-step tasks to achieve a goal, often using external tools like web browsers, code interpreters, or APIs. Unlike a simple chatbot that responds to one message at a time, an agent can break down complex problems, take actions, observe results, and adjust its approach.

### Chatbot

A software application that conducts conversations with users, typically through text. Modern AI chatbots like ChatGPT, Claude, and Gemini are powered by large language models and can handle a wide range of questions and tasks. They represent the most common way people interact with generative AI today.

### Foundation Model

A large AI model trained on broad data that can be adapted to many different tasks. Models like GPT-4, Claude, and Llama are foundation models because they serve as a "foundation" that can be fine-tuned, prompted, or otherwise adapted for specific applications ranging from chatbots to code generation to scientific research.

### Large Language Model (LLM)

An AI model with billions of parameters that has been trained on vast amounts of text data to understand and generate human language. LLMs like GPT-4, Claude, Gemini, and Llama can write, answer questions, summarize, translate, code, and reason. They are the technology behind most modern AI chatbots and assistants.

### Multimodal

An AI model or system that can understand and generate multiple types of data, such as text, images, audio, and video. GPT-4o, Gemini, and Claude are multimodal because they can process both text and images. Multimodal AI is moving toward understanding the world more holistically, the way humans use multiple senses.

### Open Source AI

AI models whose weights, and sometimes training code and data, are freely available for anyone to use, study, modify, and distribute. Examples include Meta's Llama, Mistral, and DeepSeek. Open source AI enables innovation, transparency, and customization, though the definition of "open" varies as some models restrict commercial use.

### Reasoning Model

An AI model specifically designed or trained to solve complex problems through extended step-by-step reasoning before providing an answer. Models like OpenAI's o3 and DeepSeek R1 use internal chains of thought to work through math, logic, and coding problems. They trade speed for accuracy on challenging tasks.

### Agentic AI

AI systems designed to operate with a degree of autonomy, making decisions and taking actions to accomplish goals with minimal human oversight. Agentic AI goes beyond simple question-answering to plan, use tools, and execute multi-step workflows. This paradigm is becoming central to how businesses deploy AI for complex tasks.

### Generative AI

AI systems that can create new content such as text, images, audio, video, or code. Unlike traditional AI that classifies or predicts, generative AI produces original outputs. ChatGPT generates text, DALL-E generates images, and Suno generates music. The generative AI boom began in late 2022 and has rapidly transformed many industries.
