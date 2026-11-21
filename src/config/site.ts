export interface PlanItem {
  id: string
  title: string
  tagline: string
  price: number
  priceDisplay: string
  billingType: string
  badge?: string
  guarantee: string
  description: string
  features: string[]
  ctaText: string
  popular?: boolean
  purchaseUrl: string
}

export interface ServiceItem {
  id: string
  slug: string
  title: string
  shortDesc: string
  fullDesc: string
  warranty: string
  timeline: string
  idealFor: string
  specs: string[]
  icon: string
}

export const SITE_CONFIG = {
  companyName: "Summit Shield Roofing",
  legalName: "Summit Shield Roofing & Restoration LLC",
  tagline: "Commercial & Architectural Roofing Built for Generations",
  phone: "(800) 555-7663",
  phoneRaw: "tel:18005557663",
  emergencyPhone: "(800) 911-ROOF",
  email: "dispatch@summitshieldroofing.com",
  serviceArea: "Greater Metropolitan & Tri-State Regions",
  serviceCounties: [
    "Cuyahoga County", "Allegheny County", "Franklin County", "Hamilton County",
    "Butler County", "Erie County", "Montgomery County", "Summit County"
  ],
  credentials: [
    { label: "License Status", value: "State Master Contractor #GC-884920" },
    { label: "Manufacturer Status", value: "GAF Master Elite® Certified (Top 2% in US)" },
    { label: "Insurance", value: "$5,000,000 Commercial General Liability & Workers Comp" },
    { label: "Better Business Bureau", value: "BBB Accredited A+ Rating (14 Consecutive Years)" },
    { label: "Warranty", value: "50-Year Non-Prorated Transferable System Warranty" }
  ],
  plans: [
    {
      id: "plan_NxUGyP6ePxtiN",
      title: "Certified 21-Point Roof Inspection",
      tagline: "High-resolution drone thermal imaging & comprehensive forensic condition report",
      price: 149,
      priceDisplay: "$149",
      billingType: "One-Time Assessment",
      badge: "Fast 24-Hour Dispatch",
      guarantee: "100% credited toward roof replacement",
      description: "A complete physical and drone-based inspection examining flashing, decking integrity, ventilation, moisture intrusion, and storm hail impacts.",
      features: [
        "4K Drone aerial photography & thermal infrared scans",
        "Attic moisture and thermal envelope evaluation",
        "Full digital insurance-ready condition report",
        "Accurate CAD itemized replacement/repair estimate",
        "100% credited toward your project if work is booked"
      ],
      ctaText: "Schedule Inspection ($149)",
      popular: false,
      purchaseUrl: "https://whop.com/checkout/plan_NxUGyP6ePxtiN"
    },
    {
      id: "plan_rrw2g4VrMy12U",
      title: "Project Reservation Deposit",
      tagline: "Locks in crew schedule, material supply chain & initiates project permitting",
      price: 500,
      priceDisplay: "$500",
      billingType: "Project Milestone Deposit",
      badge: "Required for Job Kickoff",
      guarantee: "Secure Card on File · 256-Bit SSL",
      description: "Secures dedicated installation date, pre-orders architectural materials from manufacturer, pulls municipal permits, and sets up card-on-file for milestone billing.",
      features: [
        "Guaranteed production calendar slot with senior crew",
        "Municipal building permit acquisition & processing",
        "Manufacturer material lock-in (GAF, CertainTeed, Owens Corning)",
        "Secure card-on-file milestone billing setup",
        "Fully refundable up to 72 hours before tear-off start"
      ],
      ctaText: "Lock In Project Deposit ($500)",
      popular: true,
      purchaseUrl: "https://whop.com/checkout/plan_rrw2g4VrMy12U"
    },
    {
      id: "plan_gb0sZp9xho5MH",
      title: "Emergency Leak & Flashing Seal",
      tagline: "Flat-rate rapid mitigation service for active leaks, storm breaches, or pipe boots",
      price: 1250,
      priceDisplay: "$1,250",
      billingType: "Flat-Rate Service Package",
      badge: "Emergency Dispatch",
      guarantee: "12-month leak warranty certificate",
      description: "Immediate deployment of rapid-response technicians to isolate leaks, reseal chimneys, install new neoprone pipe boots, and provide industrial water-barrier integrity.",
      features: [
        "Up to 2 pipe boot replacements & chimney flashing reseal",
        "Replacement of up to 1 bundle wind-damaged shingles",
        "Polymer modified elastomeric roof membrane sealant",
        "12-month watertight breach warranty certificate",
        "Before/after forensic photo documentation"
      ],
      ctaText: "Book Emergency Service ($1,250)",
      popular: false,
      purchaseUrl: "https://whop.com/checkout/plan_gb0sZp9xho5MH"
    }
  ] as PlanItem[],
  services: [
    {
      id: "srv-replacement",
      slug: "roof-replacement",
      title: "Full Architectural Roof Replacement",
      shortDesc: "Complete tear-off, reinforced decking installation, synthetic underlayment, and GAF Master Elite lifetime shingles.",
      fullDesc: "Our replacement process follows rigorous manufacturer standards. We strip old layers down to sound wood decking, install heavy-duty ice & water shield in all valleys and eaves, and install GAF Timberline HDZ architectural shingles with Dura Grip adhesive seals resisting winds up to 130 MPH.",
      warranty: "50-Year Non-Prorated Golden Pledge Warranty",
      timeline: "1 to 2 Days for Standard Residential",
      idealFor: "Roofs over 18 years old, recurring widespread leaks, or severe hail/wind impact.",
      specs: [
        "GAF Timberline HDZ or CertainTeed Landmark Pro",
        "Deck-Armor breathable synthetic underlayment",
        "WeatherWatch leak barrier in valleys and rake edges",
        "Cobra attic continuous ridge ventilation system"
      ],
      icon: "Home"
    },
    {
      id: "srv-repair",
      slug: "roof-repair",
      title: "Precision Roof & Flashing Repairs",
      shortDesc: "Targeted structural repairs restoring leaks, skylight seals, chimney step-flashing, and storm wind damage.",
      fullDesc: "Don't let minor leaks rot your sub-decking or drywall. Our certified repair specialists pinpoint the true origin of water entry—often yards away from the ceiling stain—and execute lasting forensic repairs using commercial-grade adhesives and color-matched shingles.",
      warranty: "2-Year Workmanship Guarantee on All Repairs",
      timeline: "Same-Day / Next-Day Service",
      idealFor: "Localized storm damage, flashing separations, cracked vent collars, or missing shingles.",
      specs: [
        "Custom bent 26-gauge aluminum or copper step flashing",
        "Perma-Boot lifetime pipe penetration seals",
        "Ice dam mitigation and heat cable installation",
        "Structural rafter and decking reinforcement"
      ],
      icon: "Wrench"
    },
    {
      id: "srv-commercial",
      slug: "commercial-flat-roofing",
      title: "Commercial Low-Slope & Flat Roofing",
      shortDesc: "TPO single-ply heat-welded membranes, EPDM rubber systems, and fluid-applied elastomeric restoration coatings.",
      fullDesc: "Engineered for warehouses, industrial facilities, retail strips, and apartment complexes. Our certified commercial roofing division installs puncture-resistant, UV-reflective 60-mil TPO membranes that slash HVAC energy bills while providing monolithic watertight protection.",
      warranty: "20 to 30-Year NDL (No Dollar Limit) Manufacturer Warranty",
      timeline: "3 to 7 Days depending on square footage",
      idealFor: "Commercial buildings, industrial facilities, low-slope roofs, multi-family units.",
      specs: [
        "Carlisle & Firestone 60-mil Reinforced TPO & EPDM",
        "R-30 Polyiso rigid insulation boards",
        "Hot-air robotically welded seam technology",
        "Commercial scupper and interior drain retrofitting"
      ],
      icon: "Building2"
    },
    {
      id: "srv-inspection",
      slug: "drone-inspections",
      title: "21-Point Drone Thermal Roof Inspections",
      shortDesc: "FAA Part 107 certified drone pilots utilize FLIR radiometric thermal cameras to detect trapped moisture and unseen damage.",
      fullDesc: "Walking on damaged shingles can cause further degradation. Our aerial inspection fleet captures sub-millimeter 4K orthomosaic imagery and thermal heat-loss signatures, providing indisputable evidence for insurance claims and proactive maintenance budgets.",
      warranty: "Certified Digital Engineering Inspection Document",
      timeline: "45-Minute On-Site Flight + Same-Day Report",
      idealFor: "Annual preventative checks, pre-purchase real estate inspections, or post-storm claims.",
      specs: [
        "DJI Enterprise Thermal Radiometric Sensors",
        "Sub-surface moisture entrapment scanning",
        "Complete structural elevation mapping",
        "Direct export for insurance adjuster submission"
      ],
      icon: "ShieldAlert"
    }
  ] as ServiceItem[],
  testimonials: [
    {
      author: "David & Sarah K.",
      location: "Highland Heights, OH",
      rating: 5,
      date: "October 2026",
      project: "Full Roof Replacement (42 Squares)",
      review: "From the initial $149 drone inspection to the final walkthrough, Summit Shield ran like clockwork. Paying the $500 project deposit via Apple Pay was seamless, and their crew finished the entire 4,200 sq ft roof in two days with zero nails left in our lawn. The final invoice with financing was clear and stress-free."
    },
    {
      author: "Marcus Vance",
      location: "Commercial Property Manager, Pittsburgh PA",
      rating: 5,
      date: "September 2026",
      project: "Commercial TPO Flat Roof (12,000 sq ft)",
      review: "Managing three retail centers requires contractors who respect timelines and documentation. Summit Shield provided thermal heat-loss maps before touching a single seam. The milestone billing through their automated portal made board accounting effortless. Highly recommended."
    },
    {
      author: "Elena Rostova",
      location: "Upper Arlington, OH",
      rating: 5,
      date: "November 2026",
      project: "Emergency Leak & Chimney Flashing Repair",
      review: "A heavy windstorm ripped off two sections of ridge cap during a torrential downpour. Booked their emergency repair flat rate on their website at 7:30 AM; technician Tyler was on our roof by 10:15 AM with materials in hand. Saved our ceiling and hardwood floors."
    }
  ]
}
