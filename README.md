# Flowinance

A financial management app that uses AI for transaction categorization, helping users easily control and visualize their expenses, income, savings, and investments.

<img width="1200" alt="image" src="https://github.com/user-attachments/assets/c2d40717-78e8-43e2-94d3-42b56fee8012">

## Getting Started

Flowinance runs its database on Supabase. Supabase allows you to run a local instance, so you don’t have to worry about breaking the production database. First, we are going to configure Supabase locally, following the [documentation](https://supabase.com/docs/guides/local-development/cli/getting-started) that Supabase provides. In this example, **we will do it using a Mac**, but check their documentation for adapting it to your operating system.

1. Install the Supabase CLI:
   ```bash
   brew install supabase/tap/supabase
   ```
2. The Supabase CLI uses Docker containers to manage the local development stack. [Install Docker](https://docs.docker.com/desktop/).
3. Run Docker.
4. Run Supabase locally:
   ```bash
   supabase start
   ```
5. Once all of the Supabase services are running, you'll see output containing your local Supabase credentials. Copy them into your `.env.local` file:

   ```bash
   Started supabase local development setup.

           API URL: http://localhost:54321
           DB URL: postgresql://postgres:postgres@localhost:54322/postgres
       Studio URL: http://localhost:54323
       Inbucket URL: http://localhost:54324
           anon key: eyJh......
   service_role key: eyJh......
   ```

6. You can check Supabase studio at http://localhost:54323
   <p align="center">
   <img src="https://supabase.com/docs/img/guides/cli/local-studio.png" alt="Supabase Local Studio" width="500">
   </p>

   When you are finished working on your Supabase project, you can stop the stack:

   ```bash
   supabase stop
   ```

7. Install dependencies:
   ```bash
   npm i
   ```
8. Flowinance uses [Prisma](https://www.prisma.io/) for handling the types and migrations of the database. If this is the first time you are setting up the project, generate the tables for your Supabase local instance:
   ```bash
   npx prisma migrate dev --name init
   ```
   > You may get an error `Environment variable not found: DATABASE_URL`. To fix it, run:
   ```bash
   export DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"
   ```
9. That's it! 🎉 Run Flowinance's development server and open [http://localhost:3000](http://localhost:3000):
   ```bash
   npm run dev
   ```

## Features
- ✅ Display an overview of finances through a Dashboard
- ✅ Artificial intelligence transaction categorization
- ✅ Organized display of all transactions
- ✅ End-to-end encryption
- ✅ Multi-currency
- ✅ Export all categorized transactions
- Import all categorized transactions

## Contributing

We would be really happy if you decide to contribute. Please read our [`CONTRIBUTING.md`](https://github.com/manuelalferez/flowinance/blob/main/CONTRIBUTING.md) guide before 😊

## Join our community

Feel free to join us: [Flowinance Discussions](https://github.com/manuelalferez/flowinance/discussions) for general questions, feature suggestions, or to engage with our community. 

## Ask me 

You can always contact me via [Telegram](https://t.me/manuelalferez) if you want to talk more about the project 😊

## License

[GNU General Public License v3.0](https://github.com/manuelalferez/flowinance/blob/master/LICENSE.md)

## Our Contributors

<a href="https://github.com/manuelalferez/flowinance/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=manuelalferez/flowinance" />
</a>
