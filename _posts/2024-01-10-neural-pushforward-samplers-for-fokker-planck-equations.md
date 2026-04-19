---
title: Neural Pushforward Samplers for Fokker-Planck Equations
date: 2024-01-10
author: Andrew Qing He
tags: [Deep Learning, PDEs, Stochastic Methods, Research]
---

# Neural Pushforward Samplers for Fokker-Planck Equations

The Fokker-Planck equation describes the time evolution of probability density functions in stochastic systems. Solving it numerically is challenging, especially in high dimensions.

## The Fokker-Planck Equation

For a stochastic process described by the SDE:

```
dX_t = μ(X_t, t)dt + σ(X_t, t)dW_t
```

The corresponding Fokker-Planck equation for the probability density p(x, t) is:

```
∂p/∂t = -∇·[μ(x, t)p] + ½∇·∇:[σ(x, t)σ(x, t)^T p]
```

## The Pushforward Approach

Instead of directly approximating the density function p(x, t), we learn a neural network T that maps from a simple reference distribution (like Gaussian) to the target distribution.

### Mathematical Formulation

Let Z ∼ ρ (reference distribution, e.g., N(0, I))
Let X = T(Z) where T is a neural network
Then X ∼ T#ρ (pushforward measure)

We want T#ρ ≈ p, the solution of the Fokker-Planck equation.

## Weak Adversarial Training

We use a weak adversarial formulation where a critic network φ learns to distinguish between samples from the pushforward distribution and the true distribution.

The training objective minimizes:

```
L(T, φ) = E[φ(T(Z))] - E[φ(X)] + λ·R(φ)
```

Where R(φ) is a regularization term enforcing that φ is in a suitable function space (e.g., Sobolev space).

## Advantages

1. **Sample generation**: Directly generates samples from the solution
2. **High dimensions**: Scales better than grid-based methods (avoids curse of dimensionality)
3. **Mesh-free**: No need for spatial discretization
4. **Parallelizable**: Training can be distributed across multiple GPUs

## Implementation Example

```python
import torch
import torch.nn as nn

class PushforwardNetwork(nn.Module):
    def __init__(self, input_dim, hidden_dims, output_dim):
        super().__init__()
        layers = []
        dims = [input_dim] + hidden_dims + [output_dim]

        for i in range(len(dims)-1):
            layers.append(nn.Linear(dims[i], dims[i+1]))
            if i < len(dims)-2:
                layers.append(nn.Tanh())

        self.net = nn.Sequential(*layers)

    def forward(self, z):
        return self.net(z)

class CriticNetwork(nn.Module):
    def __init__(self, input_dim, hidden_dims):
        super().__init__()
        layers = []
        dims = [input_dim] + hidden_dims + [1]

        for i in range(len(dims)-1):
            layers.append(nn.Linear(dims[i], dims[i+1]))
            if i < len(dims)-2:
                layers.append(nn.Tanh())

        self.net = nn.Sequential(*layers)

    def forward(self, x):
        return self.net(x)
```

## Results

Our method shows promising results on:

1. **Fractional Fokker-Planck equations**: Incorporating fractional derivatives
2. **McKean-Vlasov equations**: Mean-field models with interaction terms
3. **High-dimensional problems**: Up to 100 dimensions in our experiments

## Comparison with Traditional Methods

| Method             | Dimensionality | Sample Generation | Computational Cost |
| ------------------ | -------------- | ----------------- | ------------------ |
| Finite Difference  | Low (≤3)       | No                | High               |
| Monte Carlo        | Medium         | Yes               | Medium             |
| Neural Pushforward | High (≥10)     | Yes               | Medium-High        |

## Future Directions

1. **Theoretical analysis**: Better understanding of convergence properties
2. **Architecture design**: More efficient network architectures
3. **Applications**: Extending to other classes of PDEs
4. **Uncertainty quantification**: Incorporating uncertainty in the learned sampler

## Conclusion

Neural pushforward samplers represent a promising approach for solving high-dimensional Fokker-Planck equations, combining the expressive power of deep neural networks with rigorous mathematical formulations from optimal transport theory.
