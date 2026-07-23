/**
 * Accessibility utility functions
 */

/**
 * Traps focus within a given element
 * Useful for modals, dropdowns, etc.
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ) as NodeListOf<HTMLElement>

  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  function handleTabKey(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus()
          e.preventDefault()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus()
          e.preventDefault()
        }
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)

  // Focus the first element
  firstFocusable?.focus()

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Manages focus restoration when closing modals/dropdowns
 */
export function useFocusRestore() {
  let previouslyFocusedElement: HTMLElement | null = null

  const saveFocus = () => {
    previouslyFocusedElement = document.activeElement as HTMLElement
  }

  const restoreFocus = () => {
    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus()
      previouslyFocusedElement = null
    }
  }

  return { saveFocus, restoreFocus }
}

/**
 * Checks if an element has sufficient color contrast
 */
export function hasGoodContrast(foreground: string, background: string): boolean {
  // This is a simplified check - in production, you'd want a more robust solution
  // using a library like 'color-contrast-checker'

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null
  }

  // Calculate relative luminance
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const fg = hexToRgb(foreground)
  const bg = hexToRgb(background)

  if (!fg || !bg) return false

  const fgLum = getLuminance(fg.r, fg.g, fg.b)
  const bgLum = getLuminance(bg.r, bg.g, bg.b)

  const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05)

  // WCAG AA standard requires 4.5:1 for normal text, 3:1 for large text
  return contrast >= 4.5
}

/**
 * Announces content changes to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', priority)
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'

  document.body.appendChild(announcer)

  // Delay to ensure screen readers pick up the change
  setTimeout(() => {
    announcer.textContent = message

    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }, 100)
}

/**
 * Keyboard navigation helpers
 */
export const KeyboardKeys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
} as const

/**
 * Handles arrow key navigation for lists/menus
 */
export function handleArrowKeyNavigation(
  event: KeyboardEvent,
  items: HTMLElement[],
  currentIndex: number,
  orientation: 'horizontal' | 'vertical' = 'vertical'
): number {
  const { key } = event
  let newIndex = currentIndex

  if (orientation === 'vertical') {
    if (key === KeyboardKeys.ARROW_DOWN) {
      newIndex = (currentIndex + 1) % items.length
      event.preventDefault()
    } else if (key === KeyboardKeys.ARROW_UP) {
      newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
      event.preventDefault()
    }
  } else {
    if (key === KeyboardKeys.ARROW_RIGHT) {
      newIndex = (currentIndex + 1) % items.length
      event.preventDefault()
    } else if (key === KeyboardKeys.ARROW_LEFT) {
      newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
      event.preventDefault()
    }
  }

  if (key === KeyboardKeys.HOME) {
    newIndex = 0
    event.preventDefault()
  } else if (key === KeyboardKeys.END) {
    newIndex = items.length - 1
    event.preventDefault()
  }

  if (newIndex !== currentIndex) {
    items[newIndex]?.focus()
  }

  return newIndex
}

/**
 * Generates unique IDs for accessibility attributes
 */
export function generateAccessibilityId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
