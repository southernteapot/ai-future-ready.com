'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
  question: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    question: 'What will you primarily use AI for?',
    options: [
      { label: 'Writing & content creation', value: 'writing' },
      { label: 'Coding & development', value: 'coding' },
      { label: 'Research & analysis', value: 'research' },
      { label: 'Business & productivity', value: 'business' },
      { label: 'Image generation', value: 'images' },
      { label: 'General / a bit of everything', value: 'general' },
    ],
  },
  {
    question: 'How important is cost to you?',
    options: [
      { label: 'I want the best, price doesn\'t matter', value: 'premium' },
      { label: 'Good balance of quality and price', value: 'balanced' },
      { label: 'Free or as cheap as possible', value: 'budget' },
    ],
  },
  {
    question: 'How technical are you?',
    options: [
      { label: 'Not very — I want something easy', value: 'beginner' },
      { label: 'Somewhat — I\'m comfortable with technology', value: 'intermediate' },
      { label: 'Very — I can set up APIs and self-host', value: 'advanced' },
    ],
  },
  {
    question: 'How important is data privacy?',
    options: [
      { label: 'Very — my data must stay private', value: 'critical' },
      { label: 'Somewhat — I\'d prefer privacy but it\'s not a dealbreaker', value: 'moderate' },
      { label: 'Not a big concern for my use case', value: 'low' },
    ],
  },
  {
    question: 'Do you need to work with long documents?',
    options: [
      { label: 'Yes — I work with very long documents or codebases', value: 'long' },
      { label: 'Sometimes — moderate length content', value: 'medium' },
      { label: 'No — mostly short conversations', value: 'short' },
    ],
  },
  {
    question: 'Do you need image/video understanding or generation?',
    options: [
      { label: 'Yes, both understanding and generation', value: 'both' },
      { label: 'Image generation mainly', value: 'generation' },
      { label: 'Image understanding / analysis', value: 'understanding' },
      { label: 'No, text only is fine', value: 'none' },
    ],
  },
  {
    question: 'What ecosystem do you prefer?',
    options: [
      { label: 'Google (Gmail, Docs, etc.)', value: 'google' },
      { label: 'Microsoft (Office, GitHub, etc.)', value: 'microsoft' },
      { label: 'Apple', value: 'apple' },
      { label: 'No preference / independent tools', value: 'none' },
    ],
  },
];

interface Recommendation {
  name: string;
  provider: string;
  description: string;
  score: number;
  link: string;
  tier: string;
}

function getRecommendations(answers: string[]): Recommendation[] {
  const scores: Record<string, number> = {
    'chatgpt-plus': 50,
    'claude-pro': 50,
    'gemini-advanced': 50,
    'chatgpt-free': 40,
    'claude-free': 40,
    'gemini-free': 40,
    'copilot': 40,
    'local-llama': 30,
    'midjourney': 25,
    'deepseek': 30,
  };

  const [useCase, cost, technical, privacy, docLength, multimodal, ecosystem] = answers;

  // Use case scoring
  if (useCase === 'writing') { scores['claude-pro'] += 20; scores['chatgpt-plus'] += 15; scores['gemini-advanced'] += 10; }
  if (useCase === 'coding') { scores['claude-pro'] += 20; scores['chatgpt-plus'] += 15; scores['copilot'] += 20; scores['deepseek'] += 15; }
  if (useCase === 'research') { scores['gemini-advanced'] += 18; scores['claude-pro'] += 16; scores['chatgpt-plus'] += 14; }
  if (useCase === 'business') { scores['chatgpt-plus'] += 18; scores['gemini-advanced'] += 15; scores['claude-pro'] += 12; }
  if (useCase === 'images') { scores['midjourney'] += 25; scores['chatgpt-plus'] += 15; scores['gemini-advanced'] += 10; }
  if (useCase === 'general') { scores['chatgpt-plus'] += 15; scores['claude-pro'] += 15; scores['gemini-advanced'] += 15; }

  // Cost scoring
  if (cost === 'premium') { scores['claude-pro'] += 10; scores['chatgpt-plus'] += 10; scores['midjourney'] += 5; }
  if (cost === 'balanced') { scores['gemini-advanced'] += 10; scores['deepseek'] += 12; }
  if (cost === 'budget') { scores['chatgpt-free'] += 20; scores['claude-free'] += 18; scores['gemini-free'] += 18; scores['deepseek'] += 20; scores['local-llama'] += 15; scores['chatgpt-plus'] -= 10; scores['claude-pro'] -= 10; scores['gemini-advanced'] -= 10; }

  // Technical level
  if (technical === 'beginner') { scores['chatgpt-free'] += 10; scores['chatgpt-plus'] += 10; scores['gemini-free'] += 10; scores['local-llama'] -= 20; scores['deepseek'] -= 5; }
  if (technical === 'advanced') { scores['local-llama'] += 15; scores['deepseek'] += 10; scores['copilot'] += 5; }

  // Privacy
  if (privacy === 'critical') { scores['local-llama'] += 25; scores['claude-pro'] += 5; }
  if (privacy === 'moderate') { scores['claude-pro'] += 5; }

  // Document length
  if (docLength === 'long') { scores['gemini-advanced'] += 15; scores['claude-pro'] += 10; }
  if (docLength === 'medium') { scores['chatgpt-plus'] += 5; scores['claude-pro'] += 5; }

  // Multimodal
  if (multimodal === 'both') { scores['chatgpt-plus'] += 10; scores['gemini-advanced'] += 12; }
  if (multimodal === 'generation') { scores['midjourney'] += 20; scores['chatgpt-plus'] += 10; }
  if (multimodal === 'understanding') { scores['gemini-advanced'] += 12; scores['chatgpt-plus'] += 8; scores['claude-pro'] += 8; }

  // Ecosystem
  if (ecosystem === 'google') { scores['gemini-advanced'] += 15; scores['gemini-free'] += 10; }
  if (ecosystem === 'microsoft') { scores['copilot'] += 15; scores['chatgpt-plus'] += 5; }

  const recommendations: Record<string, Recommendation> = {
    'chatgpt-plus': { name: 'ChatGPT Plus', provider: 'OpenAI', description: 'The most popular AI assistant. Excellent all-rounder with GPT-5.4, image generation via GPT Image 1.5, browsing, and a massive plugin ecosystem. Also offers Go tier at $8/mo and Pro at $200/mo.', score: scores['chatgpt-plus'], link: '/models#gpt-5.4', tier: '$20/month' },
    'claude-pro': { name: 'Claude Pro', provider: 'Anthropic', description: 'Best for writing, coding, and careful analysis. Powered by Claude Sonnet 4.6 and Opus 4.6. Known for nuanced responses, low hallucination rates, and excellent instruction following. Includes Claude Code access. Also offers Max tier ($100-200/mo).', score: scores['claude-pro'], link: '/models#claude-sonnet-4.6', tier: '$20/month' },
    'gemini-advanced': { name: 'Gemini Advanced', provider: 'Google', description: 'Best for long documents and Google integration. Powered by Gemini 3.1 Pro with 1M token context window, multimodal capabilities, and deep integration with Google Workspace.', score: scores['gemini-advanced'], link: '/models#gemini-3.1-pro', tier: '$20/month' },
    'chatgpt-free': { name: 'ChatGPT (Free)', provider: 'OpenAI', description: 'Great free option with access to GPT-5.4 mini. Solid for general use, with some limitations on usage and features. Upgrade to Go ($8/mo) for more usage.', score: scores['chatgpt-free'], link: '/models#gpt-5.4', tier: 'Free' },
    'claude-free': { name: 'Claude (Free)', provider: 'Anthropic', description: 'Free access to Claude Sonnet 4.6. Excellent writing and analysis quality even on the free tier.', score: scores['claude-free'], link: '/models#claude-sonnet-4.6', tier: 'Free' },
    'gemini-free': { name: 'Gemini (Free)', provider: 'Google', description: 'Free access with a generous usage allowance. Powered by Gemini 3 Flash. Great for Google ecosystem users and multimodal tasks.', score: scores['gemini-free'], link: '/models#gemini-3-flash', tier: 'Free' },
    'copilot': { name: 'GitHub Copilot', provider: 'GitHub / Microsoft', description: 'The leading AI coding assistant. Integrates directly into your editor for real-time code suggestions, completions, and chat. Agent Mode now generally available for autonomous multi-step tasks.', score: scores['copilot'], link: '/use-cases/coding', tier: '$10/month' },
    'local-llama': { name: 'Llama 4 (Self-Hosted)', provider: 'Meta (Open Source)', description: 'Maximum privacy and control. Run Meta\'s powerful Llama 4 model on your own hardware with zero data sharing. Also consider Qwen 3 (most-downloaded on HuggingFace) or DeepSeek V3.2.', score: scores['local-llama'], link: '/models#llama-4-maverick', tier: 'Free (hardware costs)' },
    'midjourney': { name: 'Midjourney v7', provider: 'Midjourney', description: 'The gold standard for AI image generation. Midjourney v7 creates stunning, artistic images from text descriptions with improved photorealism.', score: scores['midjourney'], link: '/use-cases/images', tier: '$10/month' },
    'deepseek': { name: 'DeepSeek', provider: 'DeepSeek', description: 'Exceptional quality at rock-bottom prices. DeepSeek V3.2 performs on par with GPT-5.1 and Gemini 3 Pro. Great for coding and math, with open-source models available.', score: scores['deepseek'], link: '/models#deepseek-r1', tier: 'Free / very low cost' },
  };

  return Object.values(recommendations)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export default function QuizClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const recommendations = getRecommendations(answers);
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Your Top Recommendations</h2>
          <p className="text-muted">Based on your answers, here are the best AI tools for you:</p>
        </div>

        {recommendations.map((rec, index) => (
          <div
            key={rec.name}
            className={`bg-card rounded-2xl border-2 p-6 sm:p-8 ${
              index === 0
                ? 'border-primary shadow-lg shadow-primary/10'
                : 'border-card-border'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {index === 0 && (
                    <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
                      #1 Pick
                    </span>
                  )}
                  {index === 1 && (
                    <span className="px-2 py-0.5 bg-secondary text-white text-xs font-bold rounded-full">
                      #2
                    </span>
                  )}
                  {index === 2 && (
                    <span className="px-2 py-0.5 bg-accent text-white text-xs font-bold rounded-full">
                      #3
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold">{rec.name}</h3>
                <p className="text-sm text-muted">by {rec.provider}</p>
              </div>
              <span className="px-3 py-1 bg-surface rounded-full text-sm font-medium text-muted whitespace-nowrap">
                {rec.tier}
              </span>
            </div>
            <p className="text-muted mb-4">{rec.description}</p>
            <Link
              href={rec.link}
              className="text-primary font-medium hover:text-primary-dark transition-colors text-sm"
            >
              Learn more &rarr;
            </Link>
          </div>
        ))}

        <div className="text-center pt-4">
          <button
            onClick={restart}
            className="px-6 py-3 bg-surface rounded-xl text-foreground font-medium hover:bg-surface-dark transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full hero-gradient rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-2xl font-bold mb-6">{q.question}</h2>

      {/* Options */}
      <div className="space-y-3">
        {q.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className="w-full text-left p-4 bg-card rounded-xl border-2 border-card-border hover:border-primary hover:bg-surface transition-all duration-200 group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      {/* Back button */}
      {currentQuestion > 0 && (
        <button
          onClick={() => {
            setCurrentQuestion(currentQuestion - 1);
            setAnswers(answers.slice(0, -1));
          }}
          className="mt-6 text-sm text-muted hover:text-foreground transition-colors"
        >
          &larr; Back to previous question
        </button>
      )}
    </div>
  );
}
