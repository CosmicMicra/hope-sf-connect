import storyMaria from '@/assets/story-maria.jpg';
import storyFoodbank from '@/assets/story-foodbank.jpg';

const StoryCard = ({
  image,
  quote,
  author,
  role,
  className = ''
}: {
  image: string;
  quote: string;
  author: string;
  role: string;
  className?: string;
}) => {
  return (
    <div className={`hope-card ${className}`}>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
          <img 
            src={image} 
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-4 text-foreground">
            "{quote}"
          </blockquote>
          
          <cite className="not-italic">
            <div className="font-semibold text-lg">{author}</div>
            <div className="text-muted-foreground">{role}</div>
          </cite>
        </div>
      </div>
    </div>
  );
};

const StoriesSection = () => {
  const stories = [
    {
      image: storyMaria,
      quote: "HopeSF helped me find housing for my family in just 3 days. The AI chat made it so easy to get connected to the right resources.",
      author: "Maria",
      role: "Mother of two, age 34"
    },
    {
      image: storyFoodbank,
      quote: "Since partnering with HopeSF, we've been able to help 20 more people every day. The real-time updates help families find us when they need us most.",
      author: "Community Food Network",
      role: "Partner Organization"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stories of{' '}
            <span className="hope-gradient-text">Hope</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real people, real stories, real impact. See how HopeSF is transforming 
            lives and strengthening our community every day.
          </p>
        </div>
        
        <div className="space-y-12">
          {stories.map((story, index) => (
            <StoryCard
              key={index}
              image={story.image}
              quote={story.quote}
              author={story.author}
              role={story.role}
              className="animate-fade-in"
            />
          ))}
        </div>
        
        {/* Community Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-muted-foreground">of users find help within 24 hours</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">partner organizations</div>
          </div>
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">12</div>
            <div className="text-muted-foreground">languages supported</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;