# Payments Wallet Application

A full-featured payments wallet application offering seamless person-to-person transfers, bank-to-wallet (onramp), wallet-to-bank (off-ramp), and QR code-based payments. This project includes a user-friendly merchant application, transaction tracking, and robust deployment architecture.

---

## Key Features

### **User Application**:
- **Transfers**:
  - Person-to-person wallet transfers.
  - Bank-to-wallet (onramp) and wallet-to-bank (off-ramp) transactions.
- **QR Code Payments**:
  - Scan-and-pay functionality for quick transactions.
- **Transaction History**:
  - View detailed transaction and payment history.

### **Merchant Application**:
- Generate QR codes for payment requests.
- Track payment history with intuitive UI.

### **Backend Services**:
- **Bank Webhook Integration**:
  - Node.js-based webhook service to handle real-time bank transaction processing.
- **Transaction Handling**:
  - Reliable and secure processing of onramp/off-ramp and peer-to-peer transactions.

### **CI/CD Pipeline**:
- Automated deployment to AWS EC2 using **Docker**.
- Ensures fast, repeatable, and error-free deployments.

### **Architecture**:
Managed using **Turborepo**, featuring four core apps:
1. **User App**: End-user wallet interface.
2. **Merchant App**: Merchant-side app for QR generation and tracking.
3. **Dummy Bank Interface**: Simulated bank for testing onramp/off-ramp flows.
4. **Bank Webhook Service**: Handles bank-related webhook callbacks.

### **Hosting**:
All services are deployed on **AWS EC2** for scalability and reliability.

---

## Deployment

### Prerequisites
1. **Node.js** (v14 or above)
2. **Docker** and **Docker Compose**
3. AWS account with EC2 instances set up.

### Clone the Repository
```bash
git clone https://github.com/your-repo/payments-wallet.git
cd payments-wallet











# Turborepo starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
