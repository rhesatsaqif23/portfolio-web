"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

interface AccordionCtx {
  type: "single" | "multiple"
  value: string | string[] | undefined
  onValueChange: (value: string | string[]) => void
  openItems: Set<string>
}

const AccordionContext = React.createContext<AccordionCtx | null>(null)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error("Accordion compound components must be used within Accordion")
  return ctx
}

const AccordionItemContext = React.createContext(false)

function useAccordionItem() {
  return React.useContext(AccordionItemContext)
}

interface AccordionProps {
  type?: "single" | "multiple"
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  className?: string
  children: React.ReactNode
}

function Accordion({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  className = "",
  children,
}: AccordionProps) {
  const [internalValue, setInternalValue] = React.useState<string | string[] | undefined>(
    defaultValue ?? (type === "multiple" ? [] : undefined)
  )
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const handleValueChange = React.useCallback(
    (newValue: string | string[]) => {
      if (!isControlled) setInternalValue(newValue)
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const openItems = React.useMemo(() => {
    if (value === undefined || value === "") return new Set<string>()
    if (Array.isArray(value)) return new Set(value)
    return new Set([value])
  }, [value])

  return (
    <AccordionContext.Provider value={{ type, value, onValueChange: handleValueChange, openItems }}>
      <div className={className} data-accordion="">
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

function AccordionItem({ value, className = "", children }: AccordionItemProps) {
  const { type, value: selectedValue, onValueChange, openItems } = useAccordion()

  const isOpen = openItems.has(value)

  const handleToggle = () => {
    if (type === "multiple") {
      const current = Array.isArray(selectedValue) ? selectedValue : []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      onValueChange(next)
    } else {
      onValueChange(isOpen ? "" : value)
    }
  }

  const childrenArray = React.Children.toArray(children)
  const triggerChild = childrenArray.find(
    (c) => React.isValidElement(c) && (c.type as { displayName?: string })?.displayName === "AccordionTrigger"
  )
  const contentChild = childrenArray.find(
    (c) => React.isValidElement(c) && (c.type as { displayName?: string })?.displayName === "AccordionContent"
  )

  return (
    <AccordionItemContext.Provider value={isOpen}>
      <div className={className} data-state={isOpen ? "open" : "closed"}>
        <h3>
          <button
            type="button"
            onClick={handleToggle}
            className="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all"
            data-accordion-trigger=""
          >
            {triggerChild}
          </button>
        </h3>
        {contentChild}
      </div>
    </AccordionItemContext.Provider>
  )
}
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps {
  className?: string
  children: React.ReactNode
}

function AccordionTrigger({ className = "", children }: AccordionTriggerProps) {
  const isOpen = useAccordionItem()

  return (
    <div className={`flex w-full items-center justify-between ${className}`}>
      <div className="flex-1">{children}</div>
      <ChevronDown
        className={`ml-2 h-4 w-4 shrink-0 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </div>
  )
}
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps {
  className?: string
  children: React.ReactNode
}

function AccordionContent({ className = "", children }: AccordionContentProps) {
  const isOpen = useAccordionItem()
  const contentRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div ref={contentRef} className="overflow-hidden">
        <div className={`text-sm ${className}`}>{children}</div>
      </div>
    </div>
  )
}
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
