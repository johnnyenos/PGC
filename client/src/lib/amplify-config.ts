import { Amplify } from 'aws-amplify';

// Initialize Amplify with minimal configuration for API only
export function configureAmplify() {
  Amplify.configure({
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