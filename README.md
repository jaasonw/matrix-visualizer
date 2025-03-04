# matrix-visualizer

An interactive tool to visually perform and understand elementary row operations on matrices.

matrix-visualizer was designed to help students understand the process of Gaussian elimination and matrix row reduction. Unlike automated solvers, `matrix-visualizer` allows for direct manipulation and visualization of each step. I developed this in my undergrad to help visualize row operations and reduce arithmetic errors that can contaminate the entire Gaussian elimination process. 

# why another matrix calculator?

Yes, I am aware there's already many matrix calculators out there (Symbolab, Wolfram, etc). This does not attempt to replace them. Instead, this attempts to fill in the gap between performing row operations on a piece of paper and automatically row reducing a matrix. Manually row reducing matrices is tedious, error prone, and may not even yield the same results of online calculators. The objective of this tool is for the user to perform their own row operations to derive their own solution

# Features
- Interactive Row Operations: Apply row swaps, scaling, and addition operations with intuitive controls
- Operation History: Track the sequence of operations with undo/redo
- Intuitive Matrix Input: Simply type a space separated matrix into 1 text box and we'll figure out the rest
- Symbolic math (CAS) support provided by [math.js](mathjs.org/): Accepts variables, fractions, and symbols as matrix elements


![image](https://user-images.githubusercontent.com/8981287/218254177-55de131d-5a8a-478c-9578-a68e9e3746ab.png)



# Contributing

Patches are welcome, feel free to send a PR

# Installation

```
git clone https://github.com/jaasonw/matrix-visualizer.git

cd matrix-visualizer

pnpm install (might work with npm too)

npm run dev

# to compile
npm run build 
```

# License

MIT but do whatever you want with it

# Contact

Questions or feedback? Open an issue or reach out at hi \[at\] jasonw.me
