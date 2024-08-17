/**
 * Common redux matchers functions
 */

export const isPendingAction = (name) => (action) => action.type.startsWith(name) && action.type.endsWith("/pending")

export const isFulfilledAction = (name) => (action) =>
  action.type.startsWith(name) && action.type.endsWith("/fulfilled")

export const isRejectedAction = (name) => (action) => action.type.startsWith(name) && action.type.endsWith("/rejected")
