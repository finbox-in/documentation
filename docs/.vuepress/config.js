module.exports = {
  title: 'FinBox Documentation',
  description: 'Documentation for FinBox SDK',
  plugins: ['code-switcher', ['vuepress-plugin-code-copy', {
    color: "#00b1ff"
  }], ['@vuepress/search', {
    test: ["^((?!device-connect\/transactions).)*$"]
  }], '@vuepress/medium-zoom'],
  mounted() {
    const hash = document.location.hash;
    if (hash.length > 1) {
      const id = hash.substring(1)
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
    }
  },
  themeConfig: {
    logo: '/header.svg',
    heroText: ' ',
    smoothScroll: true,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DeviceConnect', link: '/device-connect/' },
      { text: 'BankConnect', link: '/bank-connect/' },
      { text: 'About', link: 'https://finbox.in' },
    ],
    sidebar: {
      '/device-connect/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/device-connect/'
            },
            {
              title: 'Getting Started',
              path: '/device-connect/getting-started.html'
            },
            {
              title: 'Integration',
              path: '/device-connect/integration-flow.html'
            },
          ]
        },
        {
          title: 'Sharing Data',
          collapsable: false,
          children: [
            {
              title: 'Integration',
              path: '/device-connect/mobile-integration.html'
            },
            {
              title: 'Permissions',
              path: '/device-connect/permissions.html'
            },
            {
              title: 'Android',
              path: '/device-connect/android.html'
            },
            {
              title: 'React Native',
              path: '/device-connect/react-native.html'
            },
            {
              title: 'Flutter',
              path: '/device-connect/flutter.html'
            },
            {
              title: 'Cordova',
              path: '/device-connect/cordova.html'
            },
            {
              title: 'Ionic Capacitor',
              path: '/device-connect/ionic-capacitor.html'
            },
            {
              title: 'Error Codes',
              path: '/device-connect/error-codes.html'
            }
          ]
        },
        {
          title: 'Fetching Predictors',
          collapsable: false,
          children: [
            {
              title: 'Integration',
              path: '/device-connect/insights-integration-flow.html'
            },
            {
              title: 'Insights API',
              path: '/device-connect/insights-api.html'
            },
            {
              title: 'Salt Generation',
              path: '/device-connect/salt-generation.html'
            }
          ]
        },
        {
          title: 'FAQ',
          collapsable: true,
          children: [
            {
              title: 'FAQ',
              path: '/device-connect/faq.html'
            }
          ]
        }
      ],
      '/bank-connect/': [
        {
          title: 'Overview',
          path: '/bank-connect/',
          collapsable: false
        },
        {
          title: 'Basics',
          path: '/bank-connect/basics.html',
          collapsable: false
        },
        {
          title: 'Uploading Bank Statements',
          collapsable: true,
          children: [
            {
              title: 'Overview',
              path: '/bank-connect/upload-overview.html'
            },
            {
              title: 'See in action',
              path: '/bank-connect/see-in-action.html'
            },
            {
              title: 'Android',
              path: '/bank-connect/android.html'
            },
            {
              title: 'Cordova',
              path: '/bank-connect/cordova.html'
            },
            {
              title: 'Flutter',
              path: '/bank-connect/flutter.html'
            },
            {
              title: 'JavaScript',
              path: '/bank-connect/javascript.html'
            },
            {
              title: 'REST API',
              path: '/bank-connect/upload-rest-api.html'
            }
            // {
            //   title: 'Python',
            //   path: '/bank-connect/upload-python.html'
            // }
          ]
        },
        {
          title: 'Fetching Enriched Data',
          collapsable: true,
          children: [
            {
              title: 'Overview',
              path: '/bank-connect/fetch-overview.html'
            },
            {
              title: 'REST API',
              path: '/bank-connect/rest-api.html'
            },
            // {
            //   title: 'Python',
            //   path: '/bank-connect/python.html'
            // },
            {
              title: 'Webhook',
              path: '/bank-connect/webhook.html'
            }
          ]
        },
        {
          title: 'Management',
          path: '/bank-connect/management.html',
          collapsable: false
        },
        {
          title: 'Fraud',
          path: '/bank-connect/fraud.html',
          collapsable: false
        },
        {
          title: 'Appendix',
          path: '/bank-connect/appendix.html',
          collapsable: false
        }
      ],
      '/middleware/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/middleware/'
            }
          ]
        },
        {
          title: 'Sourcing Entity',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/middleware/sourcing-entity.html'
            },
            {
              title: 'Android',
              path: '/middleware/android.html'
            },
            {
              title: 'React Native',
              path: '/middleware/react-native.html'
            },
            {
              title: 'Flutter',
              path: '/middleware/flutter.html'
            },
            {
              title: 'REST API',
              path: '/middleware/sourcing-rest-api.html'
            },
            {
              title: 'Web SDK',
              path: '/middleware/web-sdk.html'
            },
            {
              title: 'Banner',
              path: '/middleware/banner.html'
            },
          ]
        },
        {
          title: 'Lender',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/middleware/lender.html'
            }
          ]
        },
        {
          title: 'Appendix',
          path: '/middleware/appendix.html',
          collapsable: false
        },
      ],
      '/pfm/': [
        {
          title: 'Overview',
          collapsable: false,
          children: [
            {
              title: 'Introduction',
              path: '/pfm/'
            }
          ]
        },
        {
          title: 'Fetching Spends',
          collapsable: false,
          children: [
            {
              title: 'Android SDK',
              path: '/pfm/android.html'
            }
          ]
        },
      ]
    }
  },
}
