---
title: "A/B testing: is the model worth shipping?"
date: "2026-10-24"
description: "A return to experiment design, effect sizes, and the question that matters for production ML: is the improvement worth shipping?"
tags: ["Experimentation", "Machine learning", "Payments"]
---

Once in a while, it is worth going back to basics. I recently revisited three old Netflix posts on A/B testing: still good, accessible reads.

For production ML, the real question is rarely just “is this statistically significant?” It is usually closer to “is the improvement real enough, and large enough, to ship?”

## From offline metrics to an online decision

Say candidate model B looks better than model A on offline metrics for predicting whether a payment will be authorised by the payment service provider (PSP). That is enough to justify an online test, but not enough to justify deployment.

In the online test, the question shifts to the outcome that matters in production: authorisation rate, recovered revenue, or false declines. This is where the basics matter again:

- **Significance level (α)** sets the false-positive rate we accept for the test, assuming its statistical assumptions hold.
- **The p-value** tells us how surprising a result at least as extreme as the observed one would be under the null hypothesis of no difference. It is not the probability that the null hypothesis is true.
- **A confidence interval** shows the effect sizes compatible with the data under the analysis assumptions. Wider intervals mean more uncertainty.
- **Statistical power** is the chance of detecting a specified effect if that effect is real. It depends on the effect size, sample size, variability, and significance level.

## Five per cent is a choice

The most useful reminder for me was that **α = 0.05 is not magic**. It is a choice about how often our test would declare an improvement over repeated experiments where there is actually no difference. It is not a five per cent chance that any particular winning model is a false positive.

If we tighten that threshold, we usually need more data to maintain the same power for a given effect size. For ML systems, both kinds of mistake can be costly:

- Shipping a model that does not improve outcomes.
- Rejecting a model that would have improved them.

## Read the effect size and its uncertainty

I find it more useful to read A/B tests through the effect size and confidence interval, alongside the p-value.

A tiny but statistically significant lift may still be irrelevant operationally. A non-significant result with a wide interval may leave both a useful gain and a harmful loss unresolved. It does not establish that the models are equivalent; the test may simply lack the precision needed for the decision. This is probably the part I most needed to remind myself of.

The practical question is whether the estimated improvement and its uncertainty justify shipping, given the costs, guardrails, and minimum improvement that would matter to the business.

## A classification analogy

One more connection I find useful: there is a rough analogy between A/B testing and binary classification. The experiment also feeds a decision rule: ship or do not ship.

In that view, α behaves a little like a tolerated false-positive rate, while power resembles recall for improvements of a particular size. I would not push the analogy too far. A statistically significant result alone is not a complete shipping rule, and power changes with the effect size. Still, it helps me think about the trade-offs when designing an experiment.

## Further reading

The three Netflix posts that prompted this revisit:

1. [A/B testing reference 1](https://lnkd.in/ei7nx2x5)
2. [A/B testing reference 2](https://lnkd.in/eNCfUucv)
3. [A/B testing reference 3](https://lnkd.in/e8WwFxGa)
