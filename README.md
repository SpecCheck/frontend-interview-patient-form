# SpecCheck Frontend Patient Form

This is a basic Next.js app with a form to collect patient information, which imitates the first section of the SpecCheck lens ordering process.

## Development

```bash
npm install
npm run dev
```

## Structure

This is a basic Next.js app. On the client side, you will find:

1. `app/components/order-form.tsx` - A form to collect patient information
2. `app/components/ui` - Shadcn UI components

On the server side, you will find:

1. `GET /api/patients` - Gets all patients
2. `POST /api/patients` - Creates a new patient
3. `GET /api/patients/:id` - Gets a single patient by ID
4. `PUT /api/patients/:id` - Updates a patient by ID
5. `DELETE /api/patients/:id` - Deletes a patient by ID
