"use client";

import React, { useState } from 'react';
import { FileText, Database, Code, AlertCircle, CheckCircle, HelpCircle, Download, ChevronDown, ChevronRight } from 'lucide-react';

export default function OpsDocumentation() {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'features', label: 'Features Implementation', icon: CheckCircle },
    { id: 'database', label: 'Database Schema', icon: Database },
    { id: 'api', label: 'API Structure', icon: Code },
    { id: 'questions', label: 'Open Questions', icon: HelpCircle },
  ];

  const features = [
    {
      id: 'monitoring',
      title: '1. User Usage Monitoring',
      status: 'implemented' as const,
      description: 'Track individual and overall user API usage',
      implementation: [
        {
          title: 'Database',
          items: [
            'Table: usage_transactions - stores accumulated usage per customer',
            'Function: log_usage_transaction() - logs tokens, credits, API costs, and profit',
            'Automatic profit calculation: (credits_used × credit_value) - api_cost'
          ]
        },
        {
          title: 'Features',
          items: [
            'Per-customer token tracking',
            'Credit consumption monitoring',
            'Real-time API cost calculation',
            'Model usage tracking (Claude Sonnet 4)',
            'High usage threshold alerts (>100k tokens)'
          ]
        },
        {
          title: 'API Endpoints',
          items: [
            'GET /api/admin/financials - retrieve usage analytics',
            'Function: admin_financial_analytics() - comprehensive financial data'
          ]
        }
      ]
    },
    {
      id: 'sales',
      title: '2. Sales Tracking',
      status: 'implemented' as const,
      description: 'Monitor package sales and revenue breakdown',
      implementation: [
        {
          title: 'Database',
          items: [
            'Table: package_transaction - records all purchases',
            'Table: pricing_tiers - defines package tiers',
            'Packages: Starter ($20/2K), Transformation ($200/22.5K), Professional ($500/62.5K)'
          ]
        },
        {
          title: 'Analytics Functions',
          items: [
            'admin_sales_dashboard() - complete sales overview',
            'admin_total_revenue() - total revenue calculation',
            'admin_active_packages() - last 12 months activity',
            'admin_growth_rate() - month-over-month growth',
            'admin_revenue_trend() - monthly revenue history',
            'admin_package_distribution() - package performance breakdown'
          ]
        },
        {
          title: 'API Endpoints',
          items: [
            'GET /api/admin/sales - retrieve sales dashboard data'
          ]
        }
      ]
    },
    {
      id: 'gift-credits',
      title: '3. Gift Credits System',
      status: 'implemented' as const,
      description: 'Individual and bulk credit gifting capabilities',
      implementation: [
        {
          title: 'Individual Gifting',
          items: [
            'Direct credit addition to customer accounts',
            'Transaction logging with description',
            'Credit expiration set to 1 year from gift date'
          ]
        },
        {
          title: 'Bulk Gifting',
          items: [
            'Function: admin_bulk_gift_from_credits(amount)',
            'Gifts credits to ALL customers at once',
            'Creates transaction records for each customer',
            'System event logging for audit trail'
          ]
        },
        {
          title: 'API Endpoints',
          items: [
            'POST /api/admin/gift-credits - gift to individual user',
            'POST /api/admin/bulk-gift - bulk gift to all users'
          ]
        }
      ]
    },
    {
      id: 'ban-system',
      title: '4. Ban/Unban User Accounts',
      status: 'partial' as const,
      description: 'Account suspension capabilities',
      implementation: [
        {
          title: 'Database',
          items: [
            'Column: customers.is_banned (boolean)',
            'Function: admin_get_customers() - includes ban status',
            'Indexed for performance'
          ]
        },
        {
          title: 'Implemented',
          items: [
            'Ban flag storage in database',
            'Admin interface to toggle ban status',
            'Ban status visible in user list'
          ]
        },
        {
          title: 'Pending - Open Questions',
          items: [
            '❓ What happens when banned user tries to login?',
            '❓ Should API calls be blocked immediately?',
            '❓ Should existing chat sessions be terminated?',
            '❓ Should credits be frozen or remain accessible?',
            '❓ Should there be ban reason/note tracking?'
          ]
        }
      ]
    },
    {
      id: 'expiration',
      title: '5. Credit Expiration System',
      status: 'partial' as const,
      description: 'Track and manage credit expiration',
      implementation: [
        {
          title: 'Database',
          items: [
            'Column: credits.expires_at (timestamp)',
            'Column: credits.is_expired (boolean)',
            'Default expiration: 1 year from credit addition',
            'Indexed for performance queries'
          ]
        },
        {
          title: 'Tracking Functions',
          items: [
            'get_expiring_credits(days_threshold) - list credits expiring soon',
            'get_total_expiring_credits(days_threshold) - sum of expiring credits',
            'update_credit_expiration() - trigger to extend expiration on credit increase'
          ]
        },
        {
          title: 'Implemented',
          items: [
            'Credit purchase extends expiration by 1 year',
            'Query credits expiring within X days',
            'Admin can manually adjust expiration dates'
          ]
        },
        {
          title: 'Pending - Open Questions',
          items: [
            '❓ Should expired credits automatically reset to 0?',
            '❓ Current behavior: old expired credits restore when buying new package - is this correct?',
            '❓ Should there be a grace period before expiration?',
            '❓ Should expired credits be archived separately?'
          ]
        }
      ]
    },
    {
      id: 'alerts',
      title: '6. Credit Expiration Alerts',
      status: 'pending' as const,
      description: 'Notify users of expiring credits',
      implementation: [
        {
          title: 'Pending - Open Questions',
          items: [
            '❓ Where should alerts be displayed? (Dashboard banner, modal, email?)',
            '❓ When to show alerts? (30 days before, 7 days before, 1 day before?)',
            '❓ Should alerts be one-time or recurring?',
            '❓ Should users be able to dismiss alerts?',
            '❓ Should there be email notifications?',
            '❓ Admin notification for high-value expiring credits?'
          ]
        },
        {
          title: 'Recommended Implementation',
          items: [
            'Dashboard banner: 30 days before expiration',
            'Email reminder: 14 days before',
            'Final email: 3 days before',
            'Admin report: Weekly digest of expiring credits >$50'
          ]
        }
      ]
    },
    {
      id: 'refunds',
      title: '7. Refund/Adjustment Capabilities',
      status: 'blocked' as const,
      description: 'Handle refunds and credit adjustments',
      implementation: [
        {
          title: 'Technical Constraints',
          items: [
            '⚠️ HitPay payment gateway manages actual refunds',
            '⚠️ Cannot process refunds directly from frontend/Supabase',
            '⚠️ Requires HitPay API integration or manual processing'
          ]
        },
        {
          title: 'Pending - Questions for Arun',
          items: [
            '❓ Should we integrate HitPay refund API?',
            '❓ Manual refund process workflow?',
            '❓ Should credits be deducted on refund?',
            '❓ How to handle partial refunds?',
            '❓ Should refund history be tracked in system?',
            '❓ Admin approval workflow required?'
          ]
        },
        {
          title: 'Possible Solutions',
          items: [
            'Option 1: Integrate HitPay Refund API',
            'Option 2: Manual refund tracking system',
            'Option 3: Credit adjustment without payment refund'
          ]
        }
      ]
    },
    {
      id: 'gift-codes',
      title: '8. Gift Code System',
      status: 'partial' as const,
      description: 'Redeemable codes for free/discounted credits',
      implementation: [
        {
          title: 'Database',
          items: [
            'Table: gift_codes - stores code details',
            'Table: gift_code_redemptions - tracks redemptions',
            'Multi-use support with max_uses limit',
            'Expiration date tracking'
          ]
        },
        {
          title: 'Functions',
          items: [
            'create_gift_code() - admin creates codes',
            'redeem_gift_code() - users redeem codes',
            'get_all_gift_codes() - list all codes',
            'deactivate_gift_code() - disable codes',
            'edit_gift_code() - modify code settings'
          ]
        },
        {
          title: 'Implemented',
          items: [
            'Admin can create gift codes with credit amounts',
            'Track redemption count and history',
            'Prevent duplicate redemptions',
            'Automatic expiration handling',
            'Code validation and error messages'
          ]
        },
        {
          title: 'Pending - Open Questions',
          items: [
            '❓ How should users enter/redeem codes? (Settings page, checkout, modal?)',
            '❓ Should codes offer discounts on packages or just free credits?',
            '❓ For package discounts: how to integrate with HitPay checkout?',
            '❓ Should codes stack with other promotions?',
            '❓ Email notification on successful redemption?'
          ]
        },
        {
          title: 'Discount Implementation Challenge',
          items: [
            '⚠️ Package discounts require HitPay configuration changes',
            '⚠️ Cannot dynamically adjust package prices from frontend',
            'Possible solution: Apply discount as post-purchase credit bonus',
            'Alternative: Pre-configured discount tiers in HitPay'
          ]
        }
      ]
    },
    {
      id: 'financial',
      title: '9. Financial Analytics',
      status: 'implemented' as const,
      description: 'Comprehensive financial tracking and reporting',
      implementation: [
        {
          title: 'Database',
          items: [
            'Table: billing_settings - configurable pricing parameters',
            'Table: usage_transactions - API cost tracking',
            'Adjustable credit value and API rates',
            'Profit margin calculations'
          ]
        },
        {
          title: 'Metrics Tracked',
          items: [
            'Total revenue from package sales',
            'Total API costs (Anthropic usage)',
            'Net profit (revenue - API costs)',
            'Per-user profit margins',
            'Monthly revenue vs. cost trends',
            'Package performance analytics'
          ]
        },
        {
          title: 'Functions',
          items: [
            'admin_financial_analytics() - complete financial overview',
            'admin_update_billing_settings() - adjust pricing parameters',
            'Revenue/cost/profit calculations by month',
            'Profit per user analysis'
          ]
        },
        {
          title: 'Admin Controls',
          items: [
            'Adjust credit value (currently $0.008)',
            'Modify input/output API rates',
            'Change margin multiplier (currently 1.5x)',
            'Real-time profit calculation updates'
          ]
        }
      ]
    },
    {
      id: 'export',
      title: '10. Data Export',
      status: 'implemented' as const,
      description: 'Export system data to CSV',
      implementation: [
        {
          title: 'Export Capabilities',
          items: [
            'Customer list with credits',
            'Transaction history',
            'System logs',
            'Usage analytics',
            'Sales reports'
          ]
        },
        {
          title: 'Features',
          items: [
            'CSV format generation',
            'Filtered exports based on search/date',
            'Download via browser',
            'Filename includes timestamp'
          ]
        }
      ]
    },
    {
      id: 'logs',
      title: '11. System Logs & Error Tracking',
      status: 'implemented' as const,
      description: 'Comprehensive logging system',
      implementation: [
        {
          title: 'Database',
          items: [
            'Table: system_logs - centralized logging',
            'Event types: info, warning, error',
            'Categories: usage, api, admin, system, stream-error'
          ]
        },
        {
          title: 'Logged Events',
          items: [
            'High token usage warnings (>100k)',
            'Stream errors from AI API',
            'Bulk credit operations',
            'Admin actions',
            'System errors'
          ]
        },
        {
          title: 'Function',
          items: [
            'log_system_event() - unified logging interface',
            'Metadata support (JSON)',
            'User/customer association',
            'Timestamp tracking'
          ]
        },
        {
          title: 'API Endpoints',
          items: [
            'GET /api/admin/system-logs - retrieve and filter logs'
          ]
        }
      ]
    },
    {
      id: 'anthropic',
      title: '12. Anthropic API Integration',
      status: 'implemented' as const,
      description: 'Track and log AI API usage costs',
      implementation: [
        {
          title: 'Integration Points',
          items: [
            'Usage tracked on every AI completion',
            'Token counting (input + output)',
            'Real-time cost calculation',
            'Error logging for stream failures'
          ]
        },
        {
          title: 'Cost Tracking',
          items: [
            'Input rate: $0.000003 per token',
            'Output rate: $0.000015 per token',
            'Automatic profit margin calculation',
            'Accumulated per customer'
          ]
        },
        {
          title: 'Monitoring',
          items: [
            'High usage alerts',
            'Per-customer cost analysis',
            'Model usage tracking',
            'Stream error logging'
          ]
        }
      ]
    }
  ];

  const databaseSchema = [
    {
      table: 'customers',
      purpose: 'Store customer information and ban status',
      columns: [
        'customer_id (TEXT, PK)',
        'email (TEXT)',
        'user_id (UUID, FK → auth.users)',
        'is_banned (BOOLEAN)',
        'created_at (TIMESTAMPTZ)'
      ]
    },
    {
      table: 'credits',
      purpose: 'Track customer credit balances and expiration',
      columns: [
        'customer_id (TEXT, PK, FK → customers)',
        'credits (INTEGER)',
        'expires_at (TIMESTAMP)',
        'is_expired (BOOLEAN)',
        'updated_at (TIMESTAMPTZ)'
      ]
    },
    {
      table: 'credit_transactions',
      purpose: 'Log all credit additions/deductions',
      columns: [
        'id (TEXT, PK)',
        'customer_id (TEXT, FK → customers)',
        'amount (NUMERIC)',
        'description (TEXT)',
        'package_type (TEXT)',
        'expires_at (TIMESTAMP)',
        'created_at (TIMESTAMPTZ)'
      ]
    },
    {
      table: 'package_transaction',
      purpose: 'Record package purchases',
      columns: [
        'transaction_id (UUID, PK)',
        'customer_id (TEXT, FK → customers)',
        'pricing_tier_id (TEXT, FK → pricing_tiers)',
        'payment_id (VARCHAR)',
        'amount (NUMERIC)',
        'currency (VARCHAR)',
        'created_at (TIMESTAMPTZ)'
      ]
    },
    {
      table: 'pricing_tiers',
      purpose: 'Define available credit packages',
      columns: [
        'id (TEXT, PK)',
        'name (TEXT)',
        'description (TEXT)',
        'features (TEXT[])',
        'amount (INTEGER) - price in cents',
        'credits (INTEGER)',
        'savings (TEXT)',
        'featured (BOOLEAN)'
      ]
    },
    {
      table: 'usage_transactions',
      purpose: 'Track API usage and costs per customer',
      columns: [
        'id (UUID, PK)',
        'customer_id (TEXT, FK → customers, UNIQUE)',
        'tokens_used (BIGINT)',
        'credits_used (NUMERIC)',
        'api_cost (NUMERIC)',
        'profit (NUMERIC)',
        'model (TEXT)',
        'last_updated_at (TIMESTAMPTZ)'
      ]
    },
    {
      table: 'gift_codes',
      purpose: 'Store redeemable gift codes',
      columns: [
        'id (UUID, PK)',
        'code (VARCHAR, UNIQUE)',
        'credits_amount (NUMERIC)',
        'max_uses (INTEGER)',
        'current_uses (INTEGER)',
        'expires_at (TIMESTAMP)',
        'is_active (BOOLEAN)',
        'created_by (TEXT)',
        'notes (TEXT)'
      ]
    },
    {
      table: 'gift_code_redemptions',
      purpose: 'Track gift code redemption history',
      columns: [
        'id (UUID, PK)',
        'code_id (UUID, FK → gift_codes)',
        'customer_id (TEXT, FK → customers)',
        'user_id (TEXT)',
        'credits_received (NUMERIC)',
        'transaction_id (TEXT)',
        'redeemed_at (TIMESTAMP)',
        'ip_address (TEXT)',
        'user_agent (TEXT)',
        'UNIQUE(code_id, customer_id)'
      ]
    },
    {
      table: 'billing_settings',
      purpose: 'Store configurable pricing parameters',
      columns: [
        'id (UUID, PK)',
        'credit_value (NUMERIC)',
        'input_rate (NUMERIC)',
        'output_rate (NUMERIC)',
        'margin_multiplier (NUMERIC)',
        'updated_at (TIMESTAMPTZ)',
        'updated_by (UUID, FK → auth.users)'
      ]
    },
    {
      table: 'system_logs',
      purpose: 'Centralized event and error logging',
      columns: [
        'id (UUID, PK)',
        'event_type (TEXT) - info/warning/error',
        'category (TEXT) - usage/api/admin/system',
        'message (TEXT)',
        'metadata (JSONB)',
        'user_id (UUID, FK → auth.users)',
        'customer_id (TEXT)',
        'created_at (TIMESTAMPTZ)'
      ]
    }
  ];

  const apiStructure = [
    {
      category: 'Customer Management',
      endpoints: [
        'GET /api/admin/customers - List customers with filters',
        'POST /api/admin/ban-user - Ban/unban user account',
        'GET /api/admin/customer/:id - Get customer details'
      ]
    },
    {
      category: 'Credit Management',
      endpoints: [
        'POST /api/admin/gift-credits - Gift credits to user',
        'POST /api/admin/bulk-gift - Bulk gift to all users',
        'GET /api/admin/expiring-credits - List expiring credits'
      ]
    },
    {
      category: 'Gift Codes',
      endpoints: [
        'POST /api/admin/gift-codes - Create gift code',
        'GET /api/admin/gift-codes - List all codes',
        'PATCH /api/admin/gift-codes/:id - Edit code',
        'DELETE /api/admin/gift-codes/:id - Deactivate code',
        'POST /api/user/redeem-code - User redeems code'
      ]
    },
    {
      category: 'Financial Analytics',
      endpoints: [
        'GET /api/admin/financials - Complete financial analytics',
        'PATCH /api/admin/billing-settings - Update pricing config'
      ]
    },
    {
      category: 'Sales Dashboard',
      endpoints: [
        'GET /api/admin/sales - Sales dashboard data',
        'GET /api/admin/revenue-trend - Monthly revenue',
        'GET /api/admin/package-performance - Package analytics'
      ]
    },
    {
      category: 'System Logs',
      endpoints: [
        'GET /api/admin/system-logs - Retrieve logs with filters',
        'Parameters: event_type, category, customer_id, limit, offset'
      ]
    }
  ];

  const openQuestions = [
    {
      category: 'Ban System Behavior',
      questions: [
        'What should happen when a banned user tries to login?',
        'Should API calls be blocked immediately for banned users?',
        'Should existing chat sessions be terminated?',
        'Should credits be frozen or remain accessible after ban?',
        'Should there be ban reason/note tracking?',
        'Should admins receive notifications when attempting to ban high-value customers?'
      ],
      priority: 'HIGH' as const
    },
    {
      category: 'Credit Expiration Logic',
      questions: [
        'Should expired credits automatically reset to 0?',
        'Current: old expired credits restore when buying new package - is this desired?',
        'Should there be a grace period before expiration?',
        'Should expired credits be archived separately or permanently deleted?',
        'What happens to pending transactions when credits expire?'
      ],
      priority: 'HIGH' as const
    },
    {
      category: 'Expiration Alerts',
      questions: [
        'Where should alerts be displayed? (Dashboard banner, modal, email?)',
        'When to show alerts? (30 days before, 7 days before, 1 day before?)',
        'Should alerts be one-time or recurring until action taken?',
        'Should users be able to dismiss/snooze alerts?',
        'Should there be email notifications in addition to in-app alerts?',
        'Should admins get notifications for high-value expiring credits?'
      ],
      priority: 'MEDIUM' as const
    },
    {
      category: 'Refund System',
      questions: [
        'Should we integrate HitPay refund API or handle manually?',
        'What is the manual refund process workflow?',
        'Should credits be automatically deducted on refund?',
        'How to handle partial refunds vs. full refunds?',
        'Should refund history be tracked in the system?',
        'Is admin approval workflow required for refunds?',
        'What is the refund timeframe policy (30 days, 60 days, etc.)?'
      ],
      priority: 'HIGH' as const,
      note: 'Requires Arun\'s technical guidance on HitPay integration'
    },
    {
      category: 'Gift Code Redemption UX',
      questions: [
        'Where should users enter redemption codes? (Settings, checkout, modal?)',
        'Should codes offer discounts on packages or only free credits?',
        'For package discounts: how to integrate with HitPay checkout flow?',
        'Should multiple codes be stackable?',
        'Should users receive email confirmation after redemption?',
        'Should there be a public page to check code validity before redemption?'
      ],
      priority: 'MEDIUM' as const
    },
    {
      category: 'Package Discount Integration',
      questions: [
        'How to dynamically apply gift code discounts to HitPay checkout?',
        'Can package prices be adjusted programmatically via HitPay API?',
        'Alternative: Apply discount as post-purchase credit bonus?',
        'Should discounted prices be reflected in checkout or applied after?',
        'How to track discount attribution in analytics?'
      ],
      priority: 'MEDIUM' as const,
      note: 'Technical constraint: HitPay may not support dynamic pricing'
    },
    
  ];

  const renderFeature = (feature: typeof features[0]) => {
    const isExpanded = expandedItems[feature.id];
    const statusColor = {
      implemented: 'text-green-400',
      partial: 'text-yellow-400',
      pending: 'text-orange-400',
      blocked: 'text-red-400'
    }[feature.status];

    const statusBg = {
      implemented: 'bg-green-500/20',
      partial: 'bg-yellow-500/20',
      pending: 'bg-orange-500/20',
      blocked: 'bg-red-500/20'
    }[feature.status];

    return (
      <div key={feature.id} className="mb-4 border border-gray-700 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleExpand(feature.id)}
          className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-750 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusBg} ${statusColor} uppercase`}>
              {feature.status}
            </span>
          </div>
        </button>
        
        {isExpanded && (
          <div className="p-4 bg-gray-900/50">
            <p className="text-gray-300 mb-4">{feature.description}</p>
            
            {feature.implementation.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h4 className="text-sm font-semibold text-blue-400 mb-2">{section.title}</h4>
                <ul className="space-y-1 ml-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">NEO Operations Dashboard</h1>
          <p className="text-blue-100">Technical Documentation v1.0</p>
          <div className="mt-4 flex gap-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Database: PostgreSQL</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Framework: Next.js</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Auth: Supabase</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-6 space-y-2">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full px-4 py-3 rounded-lg text-left flex items-center gap-3 transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-750'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4 text-white">Project Overview</h2>
                  <p className="text-gray-300 mb-4">
                    The NEO Operations Dashboard provides comprehensive administrative controls for managing users, 
                    credits, sales analytics, and financial reporting. This documentation outlines implemented features, 
                    database architecture, and pending technical decisions.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-900 p-4 rounded border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-1">9/12</div>
                      <div className="text-sm text-gray-400">Features Implemented</div>
                    </div>
                    <div className="bg-gray-900 p-4 rounded border border-yellow-500/30">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">3</div>
                      <div className="text-sm text-gray-400">Partial/Pending Features</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-white">Dashboard Structure</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-300">
                      <span className="text-blue-400 font-mono">/ops</span>
                      <span>→ Main dashboard (authenticated admin only)</span>
                    </div>
                    <div className="ml-6 space-y-1 text-sm">
                      <div className="text-gray-400">└── <span className="text-purple-400">/credits</span> - Credit management & expiration</div>
                      <div className="text-gray-400">└── <span className="text-purple-400">/users</span> - Customer list & ban controls</div>
                      <div className="text-gray-400">└── <span className="text-purple-400">/financials</span> - Profit/cost analytics</div>
                      <div className="text-gray-400">└── <span className="text-purple-400">/sales</span> - Revenue & package tracking</div>
                      <div className="text-gray-400">└── <span className="text-purple-400">/logs</span> - System logs & errors</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-white">Technology Stack</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Frontend</h4>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Next.js 14 (App Router)</li>
                        <li>• React Hooks for state</li>
                        <li>• Tailwind CSS styling</li>
                        <li>• TypeScript</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Backend</h4>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Supabase (PostgreSQL)</li>
                        <li>• PL/pgSQL functions</li>
                        <li>• Row Level Security (RLS)</li>
                        <li>• API Routes (Next.js)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-1">Current Authentication</h4>
                      <p className="text-sm text-gray-300">
                        Admin routes are currently restricted to Ftay&apos;s email. Authentication is being 
                        temporarily removed to allow Arun access for review. Production deployment will 
                        require multi-admin support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'features' && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-white">Feature Implementation Status</h2>
                {features.map(renderFeature)}
              </div>
            )}

            {activeSection === 'database' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Database Schema</h2>
                
                {databaseSchema.map((table, idx) => (
                  <div key={idx} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-5 h-5 text-blue-400" />
                      <h3 className="text-xl font-bold text-white">{table.table}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{table.purpose}</p>
                    <div className="bg-gray-900 p-4 rounded border border-gray-700">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Columns:</h4>
                      <ul className="space-y-1">
                        {table.columns.map((col, i) => (
                          <li key={i} className="text-sm text-gray-300 font-mono">{col}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}

                <div className="bg-purple-900/30 border border-purple-500/30 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">Key Database Functions</h3>
                  <div className="space-y-2 text-sm">
                    <div className="font-mono text-gray-300">log_usage_transaction()</div>
                    <div className="font-mono text-gray-300">log_system_event()</div>
                    <div className="font-mono text-gray-300">admin_get_customers()</div>
                    <div className="font-mono text-gray-300">admin_bulk_gift_from_credits()</div>
                    <div className="font-mono text-gray-300">create_gift_code()</div>
                    <div className="font-mono text-gray-300">redeem_gift_code()</div>
                    <div className="font-mono text-gray-300">admin_sales_dashboard()</div>
                    <div className="font-mono text-gray-300">admin_financial_analytics()</div>
                    <div className="font-mono text-gray-300">get_expiring_credits()</div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'api' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-white">API Structure</h2>
                
                {apiStructure.map((category, idx) => (
                  <div key={idx} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Code className="w-5 h-5 text-green-400" />
                      <h3 className="text-xl font-bold text-white">{category.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.endpoints.map((endpoint, i) => (
                        <div key={i} className="bg-gray-900 px-4 py-2 rounded border border-gray-700 font-mono text-sm text-gray-300">
                          {endpoint}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-white">Authentication Flow</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">1.</span>
                      <span>Client calls Next.js API route (e.g., /api/admin/customers)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">2.</span>
                      <span>API route creates Supabase client and validates user session</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">3.</span>
                      <span>Checks if user email matches ADMIN_EMAILS env variable</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">4.</span>
                      <span>Creates admin Supabase client with elevated privileges</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">5.</span>
                      <span>Calls database RPC function with SECURITY DEFINER</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 font-bold">6.</span>
                      <span>Returns formatted JSON response to client</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'questions' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Open Questions for Client & Tech Lead</h2>
                
                <div className="bg-yellow-900/30 border border-yellow-500/30 p-4 rounded-lg mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-400 mb-1">Action Required</h4>
                      <p className="text-sm text-gray-300">
                        These questions need clarification from <strong>Ftay (Product)</strong> and <strong>Arun (Technical)</strong> 
                        before full implementation can proceed.
                      </p>
                    </div>
                  </div>
                </div>

                {openQuestions.map((section, idx) => {
                  const priorityColor = {
                    HIGH: 'border-red-500/50 bg-red-900/20',
                    MEDIUM: 'border-yellow-500/50 bg-yellow-900/20',
                    LOW: 'border-blue-500/50 bg-blue-900/20'
                  }[section.priority];

                  const priorityBadge = {
                    HIGH: 'bg-red-600 text-white',
                    MEDIUM: 'bg-yellow-600 text-white',
                    LOW: 'bg-blue-600 text-white'
                  }[section.priority];

                  return (
                    <div key={idx} className={`border rounded-lg p-6 ${priorityColor}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-white">{section.category}</h3>
                        <span className={`px-3 py-1 rounded text-xs font-bold ${priorityBadge}`}>
                          {section.priority} PRIORITY
                        </span>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {section.questions.map((q, i) => (
                          <li key={i} className="flex items-start gap-3 text-gray-300">
                            <HelpCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{q}</span>
                          </li>
                        ))}
                      </ul>

                      {section.note && (
                        <div className="bg-gray-900/50 border border-gray-700 p-3 rounded text-sm text-gray-400 italic">
                          <strong>Note:</strong> {section.note}
                        </div>
                      )}
                    </div>
                  );
                })}

                
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>NEO Operations Dashboard Documentation • Version 1.0 • Last Updated: November 2025</p>
         
        </div>
      </div>
    </div>
  );
}