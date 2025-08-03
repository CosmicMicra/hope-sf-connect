import { ChatMessage } from '@/types/chat';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Embedded CSV-like data for few-shot prompting
const SF_RESOURCES_DATA = `
FOOD DISTRIBUTION CENTERS WITH CURRENT INVENTORY:
Name,Address,Coordinates,Peanut Butter,Bananas,Bottled Water,Granola Bars,Diapers,Tampons,Soap,Instant Ramen
The Roberts Foundation,"180 Redwood St #350, San Francisco, CA 94102","37.78103054422582, -122.4200077596358",76,76,11,67,61,9,47,18
Project Open Hand,"730 Polk St, San Francisco, CA 94109","37.78392699932666, -122.41924991915745",88,12,93,56,7,86,8,99
Southeast Asian Community,"875 O'Farrell St, San Francisco, CA 94109","37.784944776413674, -122.41905913265019",99,56,71,82,94,8,64,31
Nonassistance Food Stamp Program,"1235 Mission St, San Francisco, CA 94103","37.77675577439444, -122.41374211915793",75,97,21,35,82,72,23,69
TDNC - Kelly Cullen Neighborhood Pantry,"210 Golden Gate Ave, San Francisco, CA 94102","37.782201700418234, -122.41407635963589",93,47,54,83,75,62,68,51
St. Anthony Foundation,"150 Golden Gate Ave, San Francisco, CA 94102","37.782398661446535, -122.41316963080006",98,42,88,36,0,69,79,9
Salvation Army - Kroc Center,"240 Turk St, San Francisco, CA 94102","37.78316174212297, -122.41312151730732",2,88,88,22,56,2,54,0
St. Anthony's Dining Room,"121 Golden Gate Ave Floor 1, San Francisco, CA 94102","37.78226757974537, -122.4131804461431",31,93,83,98,98,7,28,36
San Francisco City Impact Rescue Mission,"140 Turk St, San Francisco, CA 94102","37.78363351402294, -122.4116016903219",29,0,41,39,74,48,90,7
Youth with a Mission,"357 Ellis St, San Francisco, CA 94102","37.78487645176414, -122.41213693265023",56,28,86,87,7,89,68,61
El Mercadito de la Voz,"456 Ellis St, San Francisco, CA 94102","37.785083896937294, -122.41374100196424",69,72,20,65,39,0,49,34
Glide Memorial Church,"330 Ellis St, San Francisco, CA 94102","37.78530655477329, -122.41168699032177",20,32,35,91,81,99,32,70
San Francisco-Marin Food Bank,"300 Ellis St, San Francisco, CA 94102","37.78536977548696, -122.41101378847134",45,62,38,96,11,35,85,42
CityTeam San Francisco,"164 6th St, San Francisco, CA 94103","37.78024406505149, -122.40780404799354",65,87,9,86,24,36,7,51
Interfaith Coalition On Immigrant Rights,"965 Mission St, San Francisco, CA 94103","37.78163410191613, -122.40752718847162",64,13,98,0,39,86,51,88
The Salvation Army South of Market Corps,"360 4th St, San Francisco, CA 94107","37.7813611454285, -122.40076623265027",63,89,83,83,0,81,73,27
Donaldina Cameron House,"920 Sacramento St, San Francisco, CA 94108","37.79348283600815, -122.40841713079965",50,65,92,44,88,98,11,13

HOUSING RESOURCES:
Organization,Service,Phone,Address,Hours,Eligibility
Hamilton Family Center,Emergency housing for families,(415) 255-8100,1095 Market St,24/7,Families with children
Coalition on Homelessness,Housing navigation services,(415) 346-3740,468 Turk St,M-F 9-5,All individuals
Compass Family Services,Transitional housing assistance,(415) 644-0504,1500 Franklin St,M-F 8-6,Low income families
SF Housing Authority,Public housing applications,(415) 715-8300,1815 Egbert Ave,M-F 8-5,Income qualified

HEALTHCARE:
Organization,Service,Phone,Address,Hours,Coverage
SF Health Network,Free/low-cost medical care,(415) 206-8000,Multiple locations,Varies by clinic,Sliding scale
HealthRIGHT 360,Community health services,(415) 762-3700,1563 Mission St,M-F 8-6,Low income
Planned Parenthood,Reproductive health services,(415) 956-8856,815 Eddy St,M-F 8-8 Sat 7-4,Sliding scale
Mental Health SF,Crisis and ongoing support,(415) 255-3737,Multiple locations,24/7 crisis,All residents
`;

export const chatbotService = {
  async sendMessage(message: string, history: ChatMessage[]): Promise<string> {
    console.log('API Key exists:', !!GEMINI_API_KEY);
    console.log('User message:', message);
    try {
      if (!GEMINI_API_KEY) {
        return this.getFallbackResponse(message);
      }

      const conversationHistory = history.slice(-5).map(msg => 
        `${msg.role === 'user' ? 'User: ' : 'Assistant: '}${msg.content}`
      ).join('\n');

      const fewShotPrompt = `You are a helpful HopeSF assistant for San Francisco residents. Use the data below to provide specific, actionable help.

SAN FRANCISCO RESOURCES DATABASE:
${SF_RESOURCES_DATA}

EXAMPLE CONVERSATIONS:
User: I need shelter tonight
Assistant: I'm here to help you find a safe place tonight! Hamilton Family Center is excellent for this - they have emergency housing available 24/7 and you can call them at (415) 255-8100 or head to 1095 Market St right now. They're really good at helping people in your situation. The Coalition on Homelessness at (415) 346-3740 is also fantastic for finding housing options. You're taking the right steps by reaching out, and there are people ready to help you!

User: I'm hungry and don't have money for food
Assistant: Great news - there are amazing places that can help you get food today! Glide Memorial is wonderful - they serve delicious free hot meals every day at 330 Ellis St. Breakfast is 7-9am and lunch 11:30-1:30pm, and the community there is really welcoming. For groceries to take home, SF-Marin Food Bank at 900 Pennsylvania Ave has fresh produce Tuesday through Saturday 10-3. Just bring an ID and you're all set! Which area of the city works best for you?

User: I need milk and diapers in tenderloin
Assistant: Hey! there are some  X, L, M, S sized diapers and 5+ bottles of milk available at Glide Memorial

User: How do I apply for food stamps?
Assistant: CalFresh (food stamps) is a fantastic resource that can really boost your food budget! The CalFresh Outreach team at (415) 558-4310 are pros at helping people apply - they make the whole process much smoother than doing it alone. You'll need your ID, any income info, and proof of address. It usually takes about 30 days, but they can expedite if needed. You're smart to look into this - it can make such a difference! Want to know what to expect when you call them?

User: My anxiety is really bad and I can't afford therapy
Assistant: You're absolutely doing the right thing by reaching out about this! Mental Health SF has incredible support available - their crisis line at (415) 255-3737 is staffed 24/7 with caring professionals. Plus, SF Health Network at (415) 206-8000 offers mental health services on a sliding scale, often free based on what you can afford. Taking care of your mental health is just as important as physical health, and these folks are really skilled at helping. What kind of support sounds most helpful to you right now?

CONVERSATION HISTORY:
${conversationHistory}

Current User: ${message}

Be positive, hopeful, and encouraging. Focus on solutions and opportunities. Use words like "great," "fantastic," "excellent," and "amazing." Celebrate their smart decision to reach out for help.`;

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      });

      const response = await model.generateContent(fewShotPrompt);
      const responseText = await response.response.text();
      
      return responseText || 'I want to help! Can you tell me more about what you need?';
      
    } catch (error) {
      console.error('Chatbot error:', error);
      return this.getFallbackResponse(message);
    }
  },

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('shelter') || lowerMessage.includes('housing') || lowerMessage.includes('homeless')) {
      return `You're taking exactly the right steps by reaching out! Hamilton Family Center is fantastic for emergency housing - available 24/7 at (415) 255-8100, and you can head right to 1095 Market St. The Coalition on Homelessness at (415) 346-3740 is also excellent at helping people find great housing options. There are caring people ready to help you right now! What area of the city works best for you?`;
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('hungry') || lowerMessage.includes('meal') || lowerMessage.includes('groceries') || lowerMessage.includes('pantry')) {
      return `Great news! San Francisco has several food distribution centers with fresh supplies. The Roberts Foundation at 180 Redwood St has peanut butter, bananas, and bottled water. Project Open Hand at 730 Polk St has a great selection of food items. St. Anthony's Dining Room at 121 Golden Gate Ave serves free meals daily. Which location works best for you?`;
    }
    
    if (lowerMessage.includes('benefit') || lowerMessage.includes('calworks') || lowerMessage.includes('assistance')) {
      return `You're being really smart about exploring your options! CalFresh Outreach at (415) 558-4310 are fantastic at helping with food stamp applications, and SF Human Services at (415) 557-5000 has great programs for cash assistance. These programs can make such a positive difference in your life! What type of support interests you most?`;
    }
    
    if (lowerMessage.includes('health') || lowerMessage.includes('medical') || lowerMessage.includes('doctor') || lowerMessage.includes('anxiety') || lowerMessage.includes('mental') || lowerMessage.includes('nutrition')) {
      return `Taking care of your health is such a smart priority! SF Health Network at (415) 206-8000 offers excellent medical and mental health services with sliding scale fees - often free! Mental Health SF at (415) 255-3737 has amazing 24/7 support too. You deserve great care, and these programs are designed to help you thrive! What kind of health support would be most helpful?`;
    }
    
    return `Hello and welcome! I'm excited to help you discover all the fantastic resources San Francisco has to offer! Whether you need housing, food, healthcare, benefits, or just want to explore your options, there are amazing programs and caring people ready to support you. Need food? The food distribution centers have fresh supplies of peanut butter, bananas, bottled water, and more. What would you like to learn about today? And remember, 2-1-1 is always available too - they're wonderful!`;
  }
};