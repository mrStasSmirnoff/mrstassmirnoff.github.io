---
title: "Notes on significance thresholds, statistical power, and interpreting A/B tests for payment models"
date: "2026-10-24"
description: "How I interpret significance levels, power, and confidence intervals when testing payment models."
tags: ["Experimentation", "Machine learning", "Payments"]
---

I recently reread three Netflix posts on A/B testing. They’re still good, accessible reads. The parts about significance thresholds and statistical power were worth revisiting.

Consider two models that predict whether a payment service provider (PSP) will authorise a payment. Model B has better offline metrics than model A. I’d want to test it online before deploying it, because we still need to measure its effect on payment outcomes.

The online test needs a metric such as authorisation rate or recovered revenue, with guardrails for outcomes we don’t want to worsen. Four statistical concepts help me interpret the result:

- **Significance level (α):** the false-positive rate allowed by the test, assuming its statistical assumptions hold.
- **P-value:** how surprising a result at least as extreme as the observed one would be under the null hypothesis of no difference. It isn’t the probability that the null hypothesis is true.
- **Confidence interval:** the range of effect sizes compatible with the data under the analysis assumptions. A wider interval means more uncertainty.
- **Statistical power:** the probability of detecting a specified effect if it exists. It depends on the effect size, sample size, variability, and significance level.

## Choosing a significance level

The reminder I found most useful was about **α = 0.05**. It’s a common threshold, but we should choose it for the experiment rather than carry it over automatically.

Under the null hypothesis and the test’s assumptions, this threshold limits false positives to five per cent over repeated experiments. It doesn’t mean there is a five per cent probability that a particular positive finding is wrong.

Lowering α usually requires more data to maintain the same power for a given effect size. That trade-off matters when both errors are costly: deploying a model that doesn’t help, or missing an improvement that would have been useful.

## Reading the result

I look at the estimated effect and confidence interval alongside the p-value. A small, statistically significant lift may not cover the cost of running and maintaining the model.

A non-significant result with a wide interval can leave a useful gain and a harmful loss unresolved. It doesn’t show that the models are equivalent. We may simply need more precision to make the decision. This was the point I most needed to remind myself of.

Before running the test, it helps to agree on the minimum improvement that would justify deployment and the guardrails we’ll use. Then we can judge the result against those criteria rather than decide what counts as useful after seeing the numbers.

## The classification analogy

I also find the comparison with binary classification helpful. If we treat detecting an improvement as a positive prediction, α resembles a tolerated false-positive rate, and power resembles recall for improvements of a particular size.

The comparison has limits. Power changes with the effect size, and statistical significance alone doesn’t tell us whether to ship. It helps me weigh the two kinds of error when planning a test.

## Further reading

The three Netflix posts that prompted this revisit:

1. [A/B testing reference 1](https://lnkd.in/ei7nx2x5)
2. [A/B testing reference 2](https://lnkd.in/eNCfUucv)
3. [A/B testing reference 3](https://lnkd.in/e8WwFxGa)
