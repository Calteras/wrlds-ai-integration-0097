export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ContentSection[];
  date: string;
  author: string;
  category: string;
  imageUrl?: string;
  keywords?: string[];
  metaDescription?: string;
}

export interface ContentSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'list' | 'quote' | 'table' | 'stats' | 'chart' | 'icon-list' | 'bibliography';
  content?: string;
  items?: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  statsData?: {
    value: string;
    label: string;
    icon?: string;
  }[];
  chartData?: {
    title: string;
    data: { name: string; value: number; }[];
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: '6',
    title: 'Why F&B Businesses in Southeast Asia Need a Modern POS in 2025',
    slug: 'fnb-modern-pos-southeast-asia-2025',
    excerpt: 'The restaurant and food service industry in Southeast Asia is booming — but legacy cash registers and outdated order systems are costing businesses real money. Here is why upgrading to a cloud POS matters now.',
    date: 'March 10, 2026',
    author: 'Calterras Holdings',
    category: 'F&B Technology',
    imageUrl: '/lovable-uploads/078a129e-0f98-4d91-af61-873687db1a04.png',
    keywords: [
      'TerraPOS',
      'POS system',
      'F&B technology',
      'restaurant technology',
      'cloud POS',
      'Southeast Asia',
      'food delivery',
      'restaurant management',
      'digital ordering',
    ],
    metaDescription: 'Discover why F&B businesses in Southeast Asia are switching to cloud POS systems like TerraPOS, and how modern point-of-sale technology drives revenue and operational efficiency.',
    content: [
      {
        type: 'paragraph',
        content: 'Southeast Asia\'s food and beverage industry is one of the fastest-growing sectors in the region, with restaurant density and consumer spending on dining both reaching record highs. Yet a surprising number of establishments still operate on legacy cash registers, paper order pads, or fragmented tools that don\'t talk to each other. In 2025, that gap between digital expectations and operational reality is costing businesses more than they realise.'
      },
      {
        type: 'stats',
        statsData: [
          {
            value: '62%',
            label: 'of SEA diners prefer restaurants with digital ordering',
            icon: 'Users'
          },
          {
            value: '3×',
            label: 'faster table turnover with integrated POS and kitchen display',
            icon: 'TrendingUp'
          },
          {
            value: '18%',
            label: 'average revenue increase after switching to cloud POS',
            icon: 'DollarSign'
          }
        ]
      },
      {
        type: 'heading',
        content: 'The Hidden Cost of Legacy Systems'
      },
      {
        type: 'paragraph',
        content: 'Traditional POS setups look inexpensive on the surface — a one-time hardware cost and you\'re done. But the real costs accumulate in missed orders, reconciliation errors, manual inventory counts, and the inability to offer delivery integrations or loyalty programs. For a restaurant doing 200 covers a day, even a 5% order error rate translates directly to lost revenue and damaged reputation.'
      },
      {
        type: 'heading',
        content: 'What TerraPOS Changes'
      },
      {
        type: 'paragraph',
        content: 'TerraPOS was built from the ground up for Southeast Asian F&B operations — factoring in local payment methods, multi-language interfaces, delivery platform integrations, and the high-volume throughput of busy food courts and cloud kitchens.'
      },
      {
        type: 'icon-list',
        items: [
          'Real-time sync between floor, kitchen, and cashier — no more shouting orders across the pass',
          'Integrated delivery management for GrabFood, GoFood, ShopeeFood, and direct online orders',
          'Inventory tracking that triggers auto-reorder before you run out of your top sellers',
          'Daily and weekly analytics dashboards so owners know their best sellers, peak hours, and staff performance'
        ]
      },
      {
        type: 'heading',
        content: 'Built for the Region, Not Retrofitted'
      },
      {
        type: 'paragraph',
        content: 'Many global POS platforms were designed for Western markets and then localised as an afterthought. TerraPOS supports QRIS, GoPay, OVO, Dana, and regional bank transfers natively — not through workarounds. Tax calculations, receipt formats, and reporting comply with Indonesian and regional accounting requirements out of the box.'
      },
      {
        type: 'quote',
        content: 'When we switched to TerraPOS, our end-of-day reconciliation went from 45 minutes to under five. That\'s time we put back into our guests.'
      },
      {
        type: 'heading',
        content: 'Getting Started'
      },
      {
        type: 'paragraph',
        content: 'TerraPOS offers a guided onboarding programme with dedicated support for the first 90 days. Whether you\'re running a single outlet or a franchise chain, the system scales with you. Contact the TerraPOS team through Calterras Holdings to request a live demo tailored to your operation type.'
      }
    ]
  },
  {
    id: '5',
    title: 'How Smart HR Systems Reduce Turnover and Drive Employee Retention',
    slug: 'hr-system-reduce-turnover-employee-retention',
    excerpt: 'Employee attrition is one of the most expensive problems a growing business faces. Acheron HR On explores how intelligent HR platforms can identify retention risks early and build a workplace people actually want to stay in.',
    date: 'February 24, 2026',
    author: 'Calterras Holdings',
    category: 'HR Technology',
    imageUrl: '/lovable-uploads/927dae7e-6aaf-4b76-add2-1287a1dd9dc0.png',
    keywords: [
      'Acheron HR On',
      'HR system',
      'employee retention',
      'staff turnover',
      'HR technology',
      'workforce management',
      'payroll software',
      'employee engagement',
    ],
    metaDescription: 'Learn how Acheron HR On helps businesses reduce employee turnover with intelligent HR tools — from automated payroll to engagement analytics and performance tracking.',
    content: [
      {
        type: 'paragraph',
        content: 'Replacing a single mid-level employee typically costs between 50% and 200% of their annual salary when you account for recruitment, onboarding, and lost productivity. Yet most companies still treat HR as a back-office function rather than a strategic lever. That mindset is changing — and the businesses making the shift are seeing it in their bottom line.'
      },
      {
        type: 'heading',
        content: 'The Retention Problem Is a Data Problem'
      },
      {
        type: 'paragraph',
        content: 'Most resignations don\'t come out of nowhere. Employees disengage gradually: missed recognition, inconsistent feedback, payroll errors, blocked career progression. The challenge is that traditional HR systems capture transactions — timesheets, payslips, leave requests — but don\'t surface the signals that predict whether someone is about to leave.'
      },
      {
        type: 'subheading',
        content: 'Early warning signals Acheron HR On tracks'
      },
      {
        type: 'icon-list',
        items: [
          'Declining attendance patterns and unusual leave clustering',
          'Stagnant performance review scores over two or more cycles',
          'Absence of promotion or salary movement over defined periods',
          'Low participation in team activities or internal programmes'
        ]
      },
      {
        type: 'heading',
        content: 'Automating the Basics So HR Can Focus on People'
      },
      {
        type: 'paragraph',
        content: 'When HR teams spend 60% of their time on payroll processing, compliance paperwork, and leave management, there\'s no bandwidth left for the work that actually retains people — career conversations, manager coaching, and culture-building. Acheron HR On automates the transactional layer so your HR team can do the human work.'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Task', 'Manual Process', 'With Acheron HR On'],
          rows: [
            ['Monthly payroll', '3–5 days of manual calculation', 'Auto-processed in under 2 hours'],
            ['Leave approval', 'Email chains and spreadsheets', 'Mobile app approval in one tap'],
            ['Performance review', 'Annual cycle, paper forms', 'Continuous check-ins with analytics'],
            ['Compliance reporting', 'Manual export and formatting', 'One-click regulatory report generation']
          ]
        }
      },
      {
        type: 'heading',
        content: 'Building a Culture That Keeps People'
      },
      {
        type: 'paragraph',
        content: 'Technology alone doesn\'t retain employees — leadership and culture do. But the right HR platform creates the infrastructure for managers to act on good intentions: scheduled 1:1 reminders, structured feedback frameworks, peer recognition tools, and learning pathways that signal investment in people\'s growth.'
      },
      {
        type: 'quote',
        content: 'The best HR system is one your managers actually use — because it makes their job easier, not harder. That\'s the design principle behind everything in Acheron HR On.'
      }
    ]
  },
  {
    id: '4',
    title: 'Fixing Healthcare Procurement: Why Hospitals Are Moving Away from Manual Processes',
    slug: 'healthcare-procurement-digital-transformation',
    excerpt: 'Healthcare institutions spend a disproportionate amount of time managing supplier relationships, purchase orders, and inventory manually. Orion Health Gateway is built to change that.',
    date: 'February 10, 2026',
    author: 'Calterras Holdings',
    category: 'Healthcare',
    imageUrl: '/lovable-uploads/6b0637e9-4a7b-40d0-b219-c8b7f879f93e.png',
    keywords: [
      'Orion Health Gateway',
      'healthcare procurement',
      'hospital supply chain',
      'medical equipment procurement',
      'healthcare technology',
      'supplier management',
      'inventory management',
    ],
    metaDescription: 'Orion Health Gateway is transforming how hospitals and clinics manage procurement — from supplier onboarding to purchase order automation and inventory compliance.',
    content: [
      {
        type: 'paragraph',
        content: 'Healthcare procurement is uniquely high-stakes: stock-outs can directly impact patient outcomes, overstocking ties up capital, and supplier verification is non-negotiable for regulatory compliance. Yet across Indonesia and much of Southeast Asia, many clinics and hospitals still rely on spreadsheets, phone calls, and email chains to manage millions of dollars of medical supplies every year.'
      },
      {
        type: 'stats',
        statsData: [
          {
            value: '30%',
            label: 'of hospital procurement spend is inefficient or duplicative',
            icon: 'DollarSign'
          },
          {
            value: '2.4×',
            label: 'more supplier errors in manual vs. digital procurement',
            icon: 'TrendingUp'
          },
          {
            value: '68%',
            label: 'of procurement staff time spent on non-strategic tasks',
            icon: 'Users'
          }
        ]
      },
      {
        type: 'heading',
        content: 'The Three Core Failures of Manual Healthcare Procurement'
      },
      {
        type: 'list',
        items: [
          'Visibility: No real-time view of inventory levels across departments or facilities, leading to emergency purchases at premium prices',
          'Compliance: Manual supplier onboarding creates gaps in documentation — certifications, product registrations, and BPOM approvals get missed',
          'Accountability: Paper-based PO workflows make it difficult to track approvals, identify delays, or audit spending patterns'
        ]
      },
      {
        type: 'heading',
        content: 'What Orion Health Gateway Provides'
      },
      {
        type: 'paragraph',
        content: 'Orion Health Gateway is a procurement platform purpose-built for healthcare institutions — not adapted from a generic B2B purchasing tool. It handles the full procurement lifecycle, from catalogue browsing and supplier verification to purchase order issuance, delivery confirmation, and invoice reconciliation.'
      },
      {
        type: 'icon-list',
        items: [
          'Verified supplier marketplace with pre-screened medical equipment and consumable vendors',
          'Automated reorder triggers based on minimum stock thresholds per department',
          'Digital approval workflows that comply with hospital internal governance requirements',
          'Integration with hospital information systems (HIS) for seamless inventory visibility'
        ]
      },
      {
        type: 'heading',
        content: 'Compliance by Design'
      },
      {
        type: 'paragraph',
        content: 'Every supplier on the Orion platform is verified for relevant certifications before they can list products. Procurement teams get automatic alerts when supplier licences are approaching expiry, and all purchase documentation is archived for audit purposes. Regulatory compliance becomes a by-product of normal operations rather than a separate, time-consuming process.'
      },
      {
        type: 'quote',
        content: 'Healthcare procurement shouldn\'t be a source of institutional risk. With the right platform, it becomes a competitive advantage — lower costs, better supplier relationships, and zero compliance gaps.'
      }
    ]
  },
  {
    id: '3',
    title: 'Precision Agriculture: How Data Is Transforming Farming in Indonesia',
    slug: 'precision-agriculture-data-farming-indonesia',
    excerpt: 'From smallholder rice farmers to large-scale palm oil estates, data-driven agriculture is proving that technology can dramatically improve yields, reduce waste, and build a more resilient food supply chain.',
    date: 'January 28, 2026',
    author: 'Calterras Holdings',
    category: 'Agriculture',
    imageUrl: '/lovable-uploads/5262afdb-dd24-4d5e-be66-7c6717adbca9.png',
    keywords: [
      'Evita Agriculture',
      'precision agriculture',
      'agritech Indonesia',
      'farming technology',
      'crop management',
      'agricultural data',
      'smart farming',
      'food supply chain',
    ],
    metaDescription: 'Evita Agriculture is helping Indonesian farmers leverage data, IoT sensors, and market connectivity to improve yields and build sustainable agribusinesses.',
    content: [
      {
        type: 'paragraph',
        content: 'Indonesia is the world\'s fourth most populous country and one of its largest agricultural producers — yet the gap between farming potential and actual productivity remains vast. The average smallholder farmer still relies on generational knowledge and manual observation rather than data. Evita Agriculture exists to close that gap.'
      },
      {
        type: 'heading',
        content: 'Why Precision Agriculture Matters for SEA'
      },
      {
        type: 'paragraph',
        content: 'Precision agriculture uses sensor data, satellite imagery, weather analytics, and market information to help farmers make better decisions. In countries like the Netherlands, these techniques have helped produce some of the world\'s highest per-hectare yields. The same principles apply in tropical climates — but the tools need to be adapted for local conditions, crop types, and infrastructure realities.'
      },
      {
        type: 'subheading',
        content: 'Core capabilities of the Evita platform'
      },
      {
        type: 'icon-list',
        items: [
          'Soil health monitoring with field-level sensor data and recommendations for fertilisation timing',
          'Weather integration that adapts irrigation schedules and harvest timing to real forecast data',
          'Crop health alerts via satellite and drone imagery analysis, detecting disease or pest pressure early',
          'Market price tracking and logistics coordination to maximise farmgate income'
        ]
      },
      {
        type: 'heading',
        content: 'Serving Every Scale of Operation'
      },
      {
        type: 'paragraph',
        content: 'One of the design challenges in agricultural technology is the enormous range of operation sizes. Evita Agriculture is designed to be useful at every scale — from a 2-hectare family farm using a simple mobile app to track inputs and yields, to a 5,000-hectare estate that needs multi-farm dashboards, supply chain integration, and regulatory reporting.'
      },
      {
        type: 'table',
        tableData: {
          headers: ['Farm Scale', 'Key Features Used', 'Primary Benefit'],
          rows: [
            ['Smallholder (< 5 ha)', 'Mobile crop journal, weather alerts, market prices', 'Better timing decisions, access to fair prices'],
            ['Mid-size (5–100 ha)', 'Soil sensors, irrigation scheduling, yield tracking', 'Reduced input costs, improved yield predictability'],
            ['Large estate (100+ ha)', 'Multi-farm dashboard, logistics, compliance reporting', 'Operational efficiency, regulatory compliance, supply chain access']
          ]
        }
      },
      {
        type: 'heading',
        content: 'Connecting Farmers to Markets'
      },
      {
        type: 'paragraph',
        content: 'Technology that improves yield is only half the equation — farmers also need better access to markets and fairer prices. Evita Agriculture includes a market connectivity layer that links certified farmers to off-takers, food processors, and export buyers, reducing the role of middlemen and improving income stability.'
      },
      {
        type: 'quote',
        content: 'When a farmer in Central Java can see today\'s wholesale price for their rice before they harvest, and connect directly with a buyer, that\'s the power of data working for agriculture.'
      }
    ]
  },
  {
    id: '2',
    title: 'The Holding Company Model: Why Calterras Builds Industry-Specific Software',
    slug: 'holding-company-model-industry-specific-software',
    excerpt: 'Generic software tries to serve everyone and ends up serving no one particularly well. The Calterras model — building focused software companies for specific industries — produces better products, deeper expertise, and stronger outcomes for customers.',
    date: 'January 14, 2026',
    author: 'Calterras Holdings',
    category: 'Company',
    imageUrl: '/lovable-uploads/4187f423-ba69-4043-be76-c43098488348.png',
    keywords: [
      'Calterras Holdings',
      'holding company model',
      'industry-specific software',
      'vertical SaaS',
      'technology strategy',
      'portfolio companies',
    ],
    metaDescription: 'Learn why Calterras Holdings builds industry-specific software companies — and why that approach produces better outcomes than horizontal, general-purpose platforms.',
    content: [
      {
        type: 'paragraph',
        content: 'The dominant narrative in enterprise software has long been horizontal scale: build a platform flexible enough to serve any industry, then grow revenue through volume. It works for some categories. But when you look at the industries with the most complex, operationally-specific workflows — F&B, healthcare, agriculture, HR — the horizontal platforms consistently fall short in the places that matter most to practitioners.'
      },
      {
        type: 'heading',
        content: 'Horizontal vs. Vertical: The Trade-off'
      },
      {
        type: 'paragraph',
        content: 'A general-purpose HR platform can manage employees in any company. But it probably can\'t handle Indonesian Jamsostek and BPJS contributions automatically, send payslips in Bahasa Indonesia with local tax calculations, or integrate with the shift scheduling patterns specific to a manufacturing plant. Those details matter enormously to the end user — and they take deep domain expertise to get right.'
      },
      {
        type: 'subheading',
        content: 'The Calterras thesis'
      },
      {
        type: 'icon-list',
        items: [
          'Each portfolio company is built by, and for, practitioners in that specific industry',
          'Shared infrastructure (infrastructure, compliance, shared services) reduces cost without homogenising the product',
          'Deep vertical knowledge compounds over time — a 5-year-old F&B POS company knows things about restaurant operations that no generalist ever will',
          'Customers get a partner who speaks their language, not a vendor who needs to be educated'
        ]
      },
      {
        type: 'heading',
        content: 'Why This Creates Better Products'
      },
      {
        type: 'paragraph',
        content: 'When your entire company focuses on one industry, product feedback loops are tighter. Your customers\' problems become your team\'s fluency. Feature prioritisation is informed by real operational needs rather than a feature request backlog from a thousand different industries. You build fewer things, but you build them better.'
      },
      {
        type: 'heading',
        content: 'The Portfolio Advantage'
      },
      {
        type: 'paragraph',
        content: 'While each company operates independently with its own product focus, the holding structure provides real advantages: shared talent pipelines, cross-company technology components, combined negotiating power with infrastructure vendors, and the ability to share go-to-market lessons across diverse industries. A hospital procurement insight can inform how we think about supplier management in agribusiness. An HR retention lesson from manufacturing applies equally in F&B.'
      },
      {
        type: 'quote',
        content: 'The best technology is invisible — it just makes running a restaurant, or a hospital, or a farm easier. That only happens when the people building the technology genuinely understand the industry they\'re serving.'
      }
    ]
  },
  {
    id: '1',
    title: 'From Jakarta to the Region: Building Software for Southeast Asian Businesses',
    slug: 'building-software-southeast-asian-businesses',
    excerpt: 'Southeast Asian businesses have unique needs that global software vendors frequently underestimate. Calterras Holdings was founded on the belief that the region deserves software built with local context at its core.',
    date: 'December 20, 2025',
    author: 'Calterras Holdings',
    category: 'Company',
    imageUrl: '/lovable-uploads/48ecf6e2-5a98-4a9d-af6f-ae2265cd4098.png',
    keywords: [
      'Calterras Holdings',
      'Southeast Asia',
      'Indonesia technology',
      'business software',
      'local tech',
      'digital transformation',
      'startup Indonesia',
    ],
    metaDescription: 'Calterras Holdings was founded to build industry-specific software rooted in Southeast Asian business context — starting from Jakarta and growing across the region.',
    content: [
      {
        type: 'paragraph',
        content: 'When you talk to a restaurant owner in Jakarta, a clinic administrator in Surabaya, or a palm oil farmer in Kalimantan, you quickly realise that their operational challenges don\'t map neatly onto the assumptions baked into software designed for markets in the US or Europe. Payment methods are different. Regulatory requirements are different. The way businesses hire, manage, and relate to their employees carries cultural context that global vendors consistently miss.'
      },
      {
        type: 'heading',
        content: 'The Southeast Asian Business Reality'
      },
      {
        type: 'paragraph',
        content: 'Southeast Asia is not a monolith — Indonesia alone spans 270 million people across 17,000 islands, with significant variation in language, regulation, infrastructure, and business practice between regions. Building software for this market requires humility about what you don\'t know, and a commitment to learning from the businesses you serve rather than telling them what they should need.'
      },
      {
        type: 'subheading',
        content: 'What "local-first" means in practice'
      },
      {
        type: 'list',
        items: [
          'Payment integrations built for GoPay, OVO, QRIS, and local bank transfers — not bolted on after launch',
          'Regulatory compliance with Indonesian labour law, BPJS, tax requirements, and BPOM product registration',
          'Customer support in Bahasa Indonesia with response times suited to business operations, not Silicon Valley timezone',
          'Pricing structures that reflect Indonesian business economics, not USD SaaS pricing converted at spot rate'
        ]
      },
      {
        type: 'heading',
        content: 'The Path from Jakarta to the Region'
      },
      {
        type: 'paragraph',
        content: 'Calterras was founded in Jakarta because that\'s where the largest concentration of the businesses we serve are — and because understanding one market deeply is better than understanding many markets superficially. As each portfolio company matures, the regional expansion follows: Malaysia, Singapore, Thailand, Vietnam, the Philippines. The sequence is deliberate. We go deep before we go wide.'
      },
      {
        type: 'heading',
        content: 'What We\'re Building Toward'
      },
      {
        type: 'paragraph',
        content: 'The long-term vision for Calterras Holdings is a portfolio of category-leading software companies in the industries that form the backbone of Southeast Asian economies — food, health, agriculture, and people management. Not a conglomerate that happens to include tech companies, but a technology group where each company is genuinely excellent at what it does.'
      },
      {
        type: 'quote',
        content: 'Southeast Asia deserves software that was built with it in mind from day one — not adapted for it as an afterthought. That\'s why we\'re here, and why we build the way we build.'
      }
    ]
  }
];
