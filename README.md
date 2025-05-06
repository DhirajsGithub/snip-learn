# 📚 SnipLearn

SnipLearn is a minimal, curated learning companion for your hobbies. Whether it's Chess, Poker, Guitar, or anything else — you don't need to master every single technique to enjoy it. SnipLearn gives you a focused, personalized learning path with just the right number of techniques based on your commitment level.

## 🚀 What SnipLearn Does

> “I want to get better at Chess (or Guitar/Poker). Do I really need to learn **everything** to enjoy it? No.”

SnipLearn answers that exact question by offering:
- Curated **learning paths** of just **5–8 techniques**.
- Customized based on your **goals** and **available time**.
- Automatically fetches **YouTube video playlists** tailored to your hobby, level, and learning path.
- Lets you **track progress** easily — skip what doesn't interest you or mark techniques as done.
- Avoids **information overload** from endless YouTube searching.

## 🧠 Real-World Problem It Solves

Many learners quit hobbies due to:
- Too much content and poor curation online.
- Lack of clear goals or levels.
- No easy way to track what matters and skip what doesn’t.

**SnipLearn** solves this by:
- Using **Google Gemini** to generate smart, minimal learning paths.
- Integrating **YouTube APIs** to pull relevant videos under your time commitment.
- Letting users skip or complete techniques with a simple swipe.

## 🧭 App Workflow

1. **Onboarding Screen** → Click **Get Started**.
2. **Hobbies Screen** → Select from available hobbies like Chess, Guitar, Poker.
3. **Flip Hobby Card** → Tap chevron icon to go to level selection.
4. **Level Selector Screen** → Choose prebuilt levels: *Casual*, *Enthusiast*, *Pro* or **customize your own**.
5. **Create My Path** → Generates 5-8 key techniques for that level using **Gemini**.
6. **Learning Path Screen** → Swipe cards to complete or skip.
7. **Technique Detail Screen** → Watch curated YouTube playlist, see description, tips, and a motivational quote.

## 📱 Demo & APK

- 🔗 **Live Demo (Video Walkthrough 1)**: [Demo Link 1](https://drive.google.com/file/d/1y7GaNQRqkEnGTIXMCg-W1ymUbbLi97sn/view?usp=sharing)  
- 🔗 **Live Demo (Video Walkthrough 2)**: [Demo Link 2](https://drive.google.com/file/d/1RiDDKZhV7JOrH8yKxJkLGNnl09jJOtz_/view?usp=sharing)  
- 📦 **Download APK**: [APK download link](https://drive.google.com/file/d/18gkEO6NLhEGPDQQ8gM82aLxxLzop55Na/view?usp=sharing)


## ⚙️ Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/DhirajsGithub/snip-learn
cd snip-learn
```

### 2. Install dependencies
```bash
npm install
cd ios
pod install
```
### 3. Setup your .env file
`Create a .env file in the root of the project and add:`

```bash
GEMINI_API=""
YOUTBE_API=""
```
### 4. Run on Android or iOS
```bash
npx react-native run-android
# or
npx react-native run-ios
```
Make sure your emulator/simulator is running or your device is connected.

## 🛠 Built With

- **React Native**  
- **Google Gemini API** – to generate learning paths and search queries  
- **YouTube Data API** – to fetch relevant video playlists  
- **AsyncStorage / Cache** – to store previously generated paths for faster loading  
- **Gesture Handling** – for swiping learning cards  

## 📦 Features in Brief

- ✅ Minimal onboarding  
- ✅ Hobby & level selector (customizable)  
- ✅ 5–8 technique learning path  
- ✅ Swipe to skip or complete  
- ✅ Curated YouTube playlists  
- ✅ Motivational quotes and quick tips  
- ✅ Offline caching of paths  

---

## 💡 Future Plans

- 🔄 Sync progress across devices  
- 📊 Analytics dashboard for your learning journey  
- 🧑‍🤝‍🧑 Social challenges and accountability features

