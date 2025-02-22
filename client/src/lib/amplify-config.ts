import { Amplify } from 'aws-amplify';

// Initialize Amplify with minimal configuration
export function configureAmplify() {
  Amplify.configure({
    Auth: {
      region: import.meta.env.VITE_AWS_REGION,
      // Minimal configuration without Cognito for now
      mandatorySignIn: false,
    },
    // Basic API configuration
    API: {
      endpoints: [
        {
          name: 'api',
          endpoint: import.meta.env.VITE_API_URL,
        },
      ],
    }
  });
}