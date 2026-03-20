import { services, type ServiceDetails } from "@/lib/services-data";

// Mock API layer for now; replace with real backend fetch later.
export async function fetchServices(): Promise<ServiceDetails[]> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return services;
}

