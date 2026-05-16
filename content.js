/**
 * CONTENT — all journey, checklist, resources and mood data
 * Edit this file to change what appears in the app.
 */
const CONTENT = {
  /**
   * Phases group journey items into 3 top-level cards on the home screen.
   * Each phase lists the journey IDs it contains.
   */
  phases: [
    {
      id: 'foundation',
      title: 'Foundation',
      sub: 'Rights, wellbeing & research',
      icon: 'ti-anchor',
      color: 'mint',
      intro: 'Start here. Lock in your legal entitlements, look after yourself, and understand where you want to go next.',
      journeyIds: ['steps', 'mental', 'research']
    },
    {
      id: 'momentum',
      title: 'Build momentum',
      sub: 'Strategy, network & brand',
      icon: 'ti-rocket',
      color: 'amber',
      intro: 'Put your plan into action. Set weekly targets, reconnect with your network, and sharpen how you show up.',
      journeyIds: ['strategy', 'network', 'brand']
    },
    {
      id: 'land',
      title: 'Land the role',
      sub: 'Interviews, skills & offers',
      icon: 'ti-trophy',
      color: 'lilac',
      intro: 'The final push. Prepare to interview brilliantly, keep learning, and negotiate the offer you deserve.',
      journeyIds: ['interview', 'upskill', 'offers']
    }
  ],

  journey: [
    {
      id: 'steps',
      title: 'Immediate next steps',
      meta: 'Week 1 · Rights & finance',
      color: 'mint',
      icon: 'ti-stairs-up',
      quote: 'Keeping paperwork organised now prevents chaos later.',
      groups: [
        {
          title: 'Redundancy rights',
          tasks: [
            'Check redundancy pay entitlements on Gov.uk',
            'Confirm receipt of your final payslip',
            'Confirm receipt of your P45 form',
            'Confirm receipt of official redundancy notice'
          ]
        },
        {
          title: 'Financial planning',
          tasks: [
            'Draft a monthly budget using your redundancy pay',
            "Check eligibility for Jobseeker's Allowance",
            'Check eligibility for Universal Credit',
            'Contact Citizens Advice for free financial guidance'
          ]
        }
      ]
    },
    {
      id: 'mental',
      title: 'Mental & emotional health',
      meta: 'Ongoing · Recommended',
      color: 'coral',
      icon: 'ti-heart-handshake',
      quote: "Being made redundant isn't a reflection of your worth — it's a transition, not a failure.",
      groups: [
        {
          title: 'Process your emotions',
          tasks: [
            'Talk to someone you trust',
            'Journal your thoughts and feelings',
            'Allow yourself time to grieve the change'
          ]
        },
        {
          title: 'Wellness routines',
          tasks: [
            'Wake at the same time daily for structure',
            'Get outside for fresh air and movement',
            'Try a meditation app like Headspace or Calm'
          ]
        },
        {
          title: 'Professional support',
          chips: [
            { i: 'ti-stethoscope', t: 'NHS Talking Therapies' },
            { i: 'ti-heart', t: 'Mind Charity' },
            { i: 'ti-users', t: 'Support groups' }
          ]
        }
      ]
    },
    {
      id: 'research',
      title: 'Job market research',
      meta: 'Foundation · Week 1-2',
      color: 'lilac',
      icon: 'ti-binoculars',
      quote: 'Understand the landscape before you start navigating.',
      groups: [
        {
          title: 'Transferable skills',
          tasks: [
            'What did you do well in your last role?',
            'Which soft and technical skills transfer across industries?'
          ]
        },
        {
          title: 'Research platforms',
          chips: [
            { i: 'ti-brand-linkedin', t: 'LinkedIn' },
            { i: 'ti-briefcase', t: 'Reed' },
            { i: 'ti-world', t: 'Indeed' },
            { i: 'ti-star', t: 'Glassdoor' }
          ]
        }
      ]
    },
    {
      id: 'strategy',
      title: 'Job search strategy',
      meta: 'Ongoing · Weekly targets',
      color: 'amber',
      icon: 'ti-rocket',
      groups: [
        {
          title: 'Weekly targets',
          targets: [
            { n: '15', l: 'Applications' },
            { n: '3', l: 'Connections' },
            { n: '1', l: 'Event' }
          ]
        },
        {
          title: 'Diversify your channels',
          tasks: [
            'Job boards (Indeed, Reed, Glassdoor)',
            'Direct company career pages',
            'Specialist and generalist recruiters',
            'LinkedIn job postings'
          ]
        },
        {
          title: 'Tip',
          quote: "Refresh your strategy weekly — what's working, what's not?"
        }
      ]
    },
    {
      id: 'network',
      title: 'Networking',
      meta: 'Ongoing · High impact',
      color: 'lilac',
      icon: 'ti-affiliate',
      quote: 'People hire people they know, trust, and respect.',
      groups: [
        {
          title: 'Reconnect & reach out',
          tasks: [
            'Message old colleagues, mentors, and clients',
            'Ask for referrals or advice — not a job directly'
          ]
        },
        {
          title: 'Grow your network',
          tasks: [
            'Join LinkedIn groups in your industry',
            'Attend online events via Eventbrite or meetups',
            'Register for an industry webinar this week'
          ]
        },
        {
          title: 'Outreach template',
          template: "Hi [Name], I hope you're doing well. I was recently made redundant and am exploring new opportunities in [industry]. I'd love to get your perspective on the market or any advice you might have."
        }
      ]
    },
    {
      id: 'brand',
      title: 'Professional brand',
      meta: 'Week 1-3 · CV & LinkedIn',
      color: 'mint',
      icon: 'ti-user-star',
      groups: [
        {
          title: 'CV & cover letter',
          tasks: [
            'Focus on achievements, not duties',
            'Use keywords from job descriptions for ATS',
            'Tailor cover letter: why the company, role, and you',
            'Ask peers or a CV service for feedback'
          ]
        },
        {
          title: 'LinkedIn optimisation',
          tasks: [
            'Add a professional headshot',
            'Update your headline with role + skills',
            'Write a summary reflecting your direction',
            'Add skills, certifications, and recommendations'
          ]
        }
      ]
    },
    {
      id: 'interview',
      title: 'Interview preparation',
      meta: 'Pre-interview · STAR',
      color: 'coral',
      icon: 'ti-microphone-2',
      quote: "You don't rise to the occasion; you fall to the level of your preparation.",
      groups: [
        {
          title: 'Research',
          tasks: [
            'Read mission, values, and recent projects',
            'Check Glassdoor reviews for culture insights',
            'Look up your interviewer on LinkedIn'
          ]
        },
        {
          title: 'The STAR framework',
          star: [
            { l: 'S', n: 'Situation', d: 'Set the scene and context' },
            { l: 'T', n: 'Task', d: 'Your specific responsibility' },
            { l: 'A', n: 'Action', d: 'What you actually did' },
            { l: 'R', n: 'Result', d: 'The measurable outcome' }
          ]
        },
        {
          title: 'Practice',
          tasks: [
            'Record and review your answers',
            'Do trial runs with friends or mentors',
            'Use InterviewBuddy or Pramp'
          ]
        }
      ]
    },
    {
      id: 'upskill',
      title: 'Upskilling & learning',
      meta: 'Ongoing · Sharpen your edge',
      color: 'amber',
      icon: 'ti-school',
      groups: [
        {
          title: 'Free platforms',
          chips: [
            { i: 'ti-school', t: 'FutureLearn' },
            { i: 'ti-book', t: 'Coursera' },
            { i: 'ti-brand-linkedin', t: 'LinkedIn Learning' }
          ]
        },
        {
          title: 'Certifications to consider',
          certs: [
            { i: 'ti-clipboard-check', n: 'Project Management', p: 'PRINCE2, Agile · AXELOS, Coursera' },
            { i: 'ti-trending-up', n: 'Digital Marketing', p: 'Google Ads, HubSpot Academy' },
            { i: 'ti-chart-line', n: 'Tech & Data', p: 'Python, SQL · DataCamp, Udemy' },
            { i: 'ti-palette', n: 'Design', p: 'UX/UI · Figma' }
          ]
        }
      ]
    },
    {
      id: 'offers',
      title: 'Offers & negotiation',
      meta: "Final stage · Don't just accept",
      color: 'mint',
      icon: 'ti-file-certificate',
      quote: "Don't just accept — assess. Your worth isn't just your salary.",
      groups: [
        {
          title: 'Evaluate the offer',
          tasks: [
            'Salary vs cost of living',
            'Career development opportunities',
            'Benefits (health, pension, leave)',
            'Culture and work-life balance'
          ]
        },
        {
          title: 'Negotiation tips',
          tasks: [
            'Express excitement first, then discuss terms',
            'Research salaries on Glassdoor before talks',
            'Practice asking confidently, not apologetically'
          ]
        }
      ]
    }
  ],

  resources: [
    {
      name: 'Gov.uk — Redundancy rights',
      sub: 'Your legal entitlements',
      url: 'https://www.gov.uk/redundancy-your-rights',
      icon: 'ti-building-bank',
      color: 'mint'
    },
    {
      name: 'Citizens Advice',
      sub: 'Free legal & financial guidance',
      url: 'https://www.citizensadvice.org.uk',
      icon: 'ti-scale',
      color: 'amber'
    },
    {
      name: 'National Careers Service',
      sub: 'Free career advice & training',
      url: 'https://nationalcareers.service.gov.uk',
      icon: 'ti-compass',
      color: 'lilac'
    },
    {
      name: 'Mind',
      sub: 'Mental health support',
      url: 'https://www.mind.org.uk',
      icon: 'ti-brain',
      color: 'coral'
    }
  ],

  checklist: [
    {
      title: 'Morning routine',
      sub: 'Start with structure',
      icon: 'ti-sunrise',
      color: 'amber',
      tasks: [
        'Wake up at your set time',
        '10–15 min of movement (walk, stretch, yoga)',
        'Eat a healthy breakfast',
        'Check in with mood or journal for 5 minutes'
      ]
    },
    {
      title: 'Job search',
      sub: 'Apply, follow up, track',
      icon: 'ti-target-arrow',
      color: 'mint',
      tasks: [
        'Review 3–5 job listings across platforms',
        'Apply to 2–3 quality roles (tailor each CV)',
        'Check target company career pages',
        'Follow up on previous applications',
        'Update your application tracker'
      ]
    },
    {
      title: 'Networking',
      sub: 'Stay visible, build trust',
      icon: 'ti-affiliate',
      color: 'lilac',
      tasks: [
        'Engage on LinkedIn (like, comment, share)',
        'Message 1 contact (mentor, ex-colleague, recruiter)',
        'Register for an upcoming event or webinar'
      ]
    },
    {
      title: 'Learn & grow',
      sub: 'Sharpen your skills',
      icon: 'ti-bulb',
      color: 'coral',
      tasks: [
        'Spend 30–60 minutes on a course',
        'Add new skills or certifications to LinkedIn',
        'Bookmark useful insights from today'
      ]
    },
    {
      title: 'Reflect & reset',
      sub: 'Close the day well',
      icon: 'ti-moon-stars',
      color: 'lilac',
      tasks: [
        'Log jobs applied to today',
        'Note any feedback or outcomes',
        "Write down 1 win you're proud of",
        'Plan top 3 priorities for tomorrow',
        'Take a screen break 1 hour before bed'
      ]
    }
  ],

  moods: [
    { e: '😔', l: 'Tough' },
    { e: '😐', l: 'Okay' },
    { e: '🙂', l: 'Good' },
    { e: '😊', l: 'Great' },
    { e: '🔥', l: 'Fired' }
  ]
};
