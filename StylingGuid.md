## 📌 Layout and Styling Example

```jsx
<div className="min-h-screen px-6 py-10 bg-[var(--cl-base)] text-[var(--cl-text)]">
    {/* Content goes here */}
</div> 
````

### 📝 Explanation:
- **min-h-screen:** Minimum height = 100% of the viewport height.
- **px-6:** Horizontal padding (1.5rem / 24px) on left and right.
- ***py-10:*** Vertical padding (2.5rem / 40px) on top and bottom.
- **bg-[var(--cl-base)]:** Background color using a custom CSS variable.
- **text-[var(--cl-text)]:** Text color using a custom CSS variable.


### 🟢 Animated Button with Framer Motion
```jsx
<motion.button
whileHover={{ scale: 1.1 }}
className="bg-[var(--cl-green)] text-[var(--cl-text-dark)] px-4 py-2 rounded"
>
    Hover Me
</motion.button>
```

### 📝 Explanation:
- **motion.button:** Framer Motion element that supports animations.
- **whileHover={{ scale: 1.1 }}:** Increases size on hover.
- **Tailwind classes:** Style the button with your theme colors and spacing.

