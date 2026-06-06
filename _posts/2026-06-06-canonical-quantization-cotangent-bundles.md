---
title: Canonical Quantization on Cotangent Bundles
date: 2026-06-06
author: Andrew Qing He
tags: [Quantum Mechanics, Differential Geometry, Mathematical Physics, Quantization]
---

# Canonical Quantization on Cotangent Bundles

In typical physics textbooks, **canonical quantization** transfers a Hamiltonian
$H(q^1, \ldots, q^n, p_1, \ldots, p_n)$ defined on $\mathbb{R}^{2n}$ by replacing
$p_i$ with $\frac{\hbar}{i}\frac{\partial}{\partial q^i}$ and $q^i$ with the
multiplication operator $q^i \cdot$, yielding a densely-defined operator on
$L^2(\mathbb{R}^n)$. This works perfectly for Euclidean space in Cartesian
coordinates. However, the simple replacement framework does not work in general
coordinates.

A simple example: the kinetic energy of a particle of mass $m$ in spherical
coordinates $(r, \theta, \varphi)$ is

$$T = \frac{1}{2m}\left(p_r^2 + \frac{p_\theta^2}{r^2} + \frac{p_\varphi^2}{r^2\sin^2\theta}\right).$$

The naive replacement $p_r, p_\theta, p_\varphi \to \frac{\hbar}{i}\partial_r,
\frac{\hbar}{i}\partial_\theta, \frac{\hbar}{i}\partial_\varphi$ gives

$$\hat{T}^? = -\frac{\hbar^2}{2m}\left(\frac{\partial^2}{\partial r^2} + \frac{1}{r^2}\frac{\partial^2}{\partial\theta^2} + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\varphi^2}\right)$$

while the correct kinetic energy operator (the one used for, e.g., the hydrogen
atom) is the Laplace-Beltrami operator

$$\hat{T} = -\frac{\hbar^2}{2m}\nabla^2 = -\frac{\hbar^2}{2m}\left(\frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial\theta}\left(\sin\theta\frac{\partial}{\partial\theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2}{\partial\varphi^2}\right).$$

Their difference is the first-order operator

$$\hat{T} - \hat{T}^? = \frac{\hbar^2}{2m}\left(\frac{2}{r}\frac{\partial}{\partial r} + \frac{\cos\theta}{r^2\sin\theta}\frac{\partial}{\partial\theta}\right) \neq 0.$$

So $\hat{T}^? \neq \hat{T}$ and the simple replacement fails. This note develops the
correct, coordinate-free definition of canonical quantization for Hamiltonians that
are fiberwise polynomial of degree at most 2 on a cotangent bundle.

## Setup

Let $M$ be a smooth manifold with a volume form $\mu$, let $L^2(M, \mu; \mathbb{C})$
be the Hilbert space of complex square-integrable functions on $M$, and let $T^*M$
be its cotangent bundle. A **quantization** is a linear map from a subspace of real
functions on $T^*M$ to a subspace of densely-defined self-adjoint operators on
$L^2(M, \mu; \mathbb{C})$.

We define canonical quantization for:

- $\mathcal{O}_C = \{F : F = a^{ij}(q)p_ip_j + b^i(q)p_i + c(q)\}$ — the space of
  fiberwise-polynomial functions of degree $\leq 2$ on $T^*M$,
- $\mathcal{O}_Q$ — the space of self-adjoint differential operators on
  $L^2(M,\mu;\mathbb{C})$ of order at most 2.

The non-triviality is that the simple replacement

$$a^{ij}(q)p_ip_j + b^i(q)p_i + c(q) \;\longmapsto\; -\hbar^2 a^{ij}(q)\frac{\partial^2}{\partial q^i \partial q^j} + \frac{\hbar}{i}b^i(q)\frac{\partial}{\partial q^i} + c(q)$$

is **not coordinate-independent** — it is not a well-defined intrinsic operation.

## Decomposition by Fiber Degree

The space $\mathcal{O}_C$ has a canonical direct sum structure

$$\mathcal{O}_C = \mathcal{O}_C^{(0)} \oplus \mathcal{O}_C^{(1)} \oplus \mathcal{O}_C^{(2)}$$

where each summand consists of functions homogeneous of degree $0, 1, 2$ in the
fiber variable $p$. For any $F \in \mathcal{O}_C$, the decomposition $F = F^{(0)} +
F^{(1)} + F^{(2)}$ is given intrinsically (without coordinates) by:

1. $F^{(0)}(q, p) = F(q, 0)$
2. $F^{(1)}(q, p) = \left.\frac{d}{dt}\right|_{t=0} \frac{F(q, tp) - F(q,0)}{t}$
3. $F^{(2)}(q, p) = F(q,p) - F^{(0)}(q,p) - F^{(1)}(q,p)$

This decomposition uses only the vector space structure of the fibers $T^*_qM$, not
any metric or connection. We then quantize each piece separately.

## Zeroth Order

The space $\mathcal{O}_C^{(0)}$ consists of fiberwise-constant functions, which are
essentially smooth functions $V: M \to \mathbb{R}$ pulled back along the fiber
projection $\pi: T^*M \to M$. The quantization is simply the pointwise multiplication
operator

$$\hat{V}: \psi \mapsto V\psi.$$

## First Order

A fiberwise-linear function on $T^*M$ is a smooth section of $(T^*_qM)^* \cong T_qM$
— that is, a **vector field** $X \in \mathfrak{X}(M)$. In local canonical coordinates
$(q^i, p_i)$, the function $X = b^i(q)p_i$ corresponds to the vector field
$b^i(q)\frac{\partial}{\partial q^i}$ on $M$.

The naive quantization $\psi \mapsto \frac{\hbar}{i}X\psi$ is not self-adjoint. A
direct computation shows that the $L^2(M,\mu)$-adjoint of $\frac{\hbar}{i}X$ is

$$\left(\frac{\hbar}{i}X\right)^\dagger = \frac{\hbar}{i}\left(X + \mathrm{div}_\mu(X)\right)$$

where $\mathrm{div}_\mu(X)$ is the **divergence of $X$ with respect to $\mu$**,
defined as the unique smooth function satisfying

$$\mathcal{L}_X\mu = \mathrm{div}_\mu(X)\cdot\mu,$$

or equivalently $\mathrm{div}_\mu(X)\cdot\mu = d(\iota_X\mu)$ via Cartan's formula.
In local coordinates with $\mu = \rho(q)\,d^nq$, this is
$\mathrm{div}_\mu(X) = \frac{1}{\rho}\partial_i(\rho X^i)$.

The resolution is to take the **self-adjoint part**:

$$\hat{X} := \frac{1}{2}\left(\frac{\hbar}{i}X + \left(\frac{\hbar}{i}X\right)^\dagger\right) = \frac{\hbar}{i}\left(X + \frac{1}{2}\mathrm{div}_\mu(X)\right).$$

This is the unique formally self-adjoint first-order differential operator with
principal symbol $\ell_X(q,\xi) = \xi(X(q))$, given the volume form $\mu$.

## Second Order

A fiberwise-quadratic function $F \in \mathcal{O}_C^{(2)}$ corresponds canonically to
a **symmetric contravariant 2-tensor** $\sigma \in \Gamma(\mathrm{Sym}^2(TM))$ via
the polarization identity: $B_F(\alpha_1, \alpha_2) = \frac{1}{2}(F(\alpha_1 +
\alpha_2) - F(\alpha_1) - F(\alpha_2))$. In local coordinates, $F = a^{ij}(q)p_ip_j$
corresponds to $a^{ij}(q)\partial_i \otimes \partial_j$.

The symmetric 2-tensor $\sigma$ determines a **second-order operator up to a
first-order term** — different choices of affine connection give different second-order
operators with the same principal symbol, differing by first-order operators. The
key result is that the self-adjointness requirement pins down a unique choice:

**Theorem.** For any $F \in \mathcal{O}_C^{(2)}$, there is a unique element in the
corresponding family of second-order differential operators that is self-adjoint as an
operator on $L^2(M, \mu; \mathbb{C})$.

_Proof (uniqueness)._ Suppose $\sigma$ and $\tilde\sigma$ are both self-adjoint and
have the same principal symbol, so $D = \sigma - \tilde\sigma$ is a self-adjoint
first-order differential operator. The adjoint of $D = A^i\partial_i$ on $L^2(M,\mu)$
is $D^\dagger = -(A^i\partial_i + \mathrm{div}_\mu(A))$. Self-adjointness
$D^\dagger = D$ forces $-A^i = A^i$, hence $A = 0$ and $D = 0$.

_Proof (existence)._ The operator

$$\hat{F}^{(2)}(\psi) := -\frac{\hbar^2}{\mu}\frac{\partial}{\partial q^i}\left(\mu\, a^{ij}\frac{\partial\psi}{\partial q^j}\right)$$

is self-adjoint on $L^2(M,\mu)$. Indeed, for compactly supported $\phi, \psi$:

$$\int_M \phi^*\,\hat{F}^{(2)}(\psi)\,\mu = \hbar^2\int_M a^{ij}\frac{\partial\phi^*}{\partial q^i}\frac{\partial\psi}{\partial q^j}\,\mu = \int_M \hat{F}^{(2)}(\phi)^*\,\psi\,\mu. \qquad\square$$

The coordinate-free description is $\hat{F}^{(2)}(\psi) = -\hbar^2\,\mathrm{div}_\mu(\sigma^\flat\,d\psi)$,
where $\sigma^\flat(\alpha) = \sigma(\alpha, \cdot)$ contracts one index of $\sigma$
against $d\psi$ to produce a vector field, and $\mathrm{div}_\mu$ is then applied.
When $\mu = \mathrm{dvol}_g$ and $\sigma = g^{-1}$, this recovers the Laplace-Beltrami
operator $\Delta_g$.

## Higher Orders

Unfortunately, the story stops here. For fiberwise-cubic (and higher) functions, the
analogous correspondence still exists — a fiberwise-degree-$k$ function determines a
family of order-$k$ operators sharing the same leading symbol, differing by
order-$(k-1)$ operators. However, the uniqueness theorem **fails** for $k \geq 3$.

In the third-order case, two self-adjoint operators in the same family can differ by a
self-adjoint first-order operator $\frac{\hbar}{i}b^i\partial_i$, and the only
constraint from self-adjointness is that $b^i$ is divergence-free with respect to
$\mu$. The space of such vector fields is infinite-dimensional, so the ambiguity is
genuine. This is consistent with the **Groenewold-Van Hove obstruction**, which
asserts that no quantization map on polynomials of degree $\geq 3$ can simultaneously
satisfy the Poisson bracket relation, act irreducibly, and extend the Schrödinger
representation.

## Summary

We constructed a canonical quantization on the cotangent bundle of a smooth manifold
$M$ equipped with a volume form $\mu$, mapping fiberwise polynomials of order at most
2 on $T^*M$ to densely-defined self-adjoint operators on $L^2(M, \mu; \mathbb{C})$.
The procedure is:

1. **Decompose** $F$ into homogeneous parts: $F = F^{(0)} + F^{(1)} + F^{(2)}$.
2. **Quantize each part** by formulas (zeroth order), (first order with symmetrization), and (second order via divergence form).
3. **Sum**: $\hat{F} = \hat{F}^{(0)} + \hat{F}^{(1)} + \hat{F}^{(2)}$.

In local canonical coordinates $(q^i, p_i)$, the quantization of $F = a^{ij}p_ip_j +
b^ip_i + c$ is

$$\hat{F} = -\frac{\hbar^2}{\mu}\frac{\partial}{\partial q^i}\!\left(\mu\, a^{ij}\frac{\partial}{\partial q^j}\right) + \frac{\hbar}{i}\!\left(b^i\frac{\partial}{\partial q^i} + \frac{1}{2\mu}\frac{\partial(\mu b^i)}{\partial q^i}\right) + c$$

where $a^{ij}, b^i, c, \mu$ are scalar functions of $(q^i)$ and $a^{ij} = a^{ji}$.
This differs from the naive replacement by the first-order correction

$$-\frac{\hbar^2}{\mu}\frac{\partial(\mu a^{ij})}{\partial q^i}\frac{\partial}{\partial q^j} + \frac{\hbar}{2i\mu}\frac{\partial(\mu b^i)}{\partial q^i}$$

which vanishes in Cartesian coordinates on $\mathbb{R}^n$ (where $\mu = d^nq$ and
$\partial_i\mu = 0$) but is nonzero in general curvilinear coordinates.

In a Hamiltonian system from classical mechanics, a Riemannian metric $g$ determines
the kinetic energy and the natural volume form $\mu = \mathrm{dvol}_g =
\sqrt{\det g}\,d^nq$. In this case the kinetic energy operator quantizes to
$\hat{T} = -\frac{\hbar^2}{2m}\Delta_g$, and for a particle of mass $m$ in
three-dimensional Euclidean space ($g_{ij} = \frac{1}{m}\delta_{ij}$) this becomes
the familiar $\hat{T} = -\frac{\hbar^2}{2m}\nabla^2$.
