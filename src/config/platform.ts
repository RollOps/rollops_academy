/**
 * Platform-wide constants.
 * Single source of truth for pricing, contact, and service details.
 */
export const PLATFORM = {
  name: 'RollOps Pro',
  supportEmail: 'support@rollops.pro',
  priceMonthly: 100,
  initialHours: 10,
  monthlyHours: 4,
  domain: 'rollops.pro',
  /** Free subdomain provided with every plan */
  freeSubdomain: 'rollops.academy',
  /** Domain registrar partner for custom domains */
  domainRegistrar: 'name.com',
} as const
