---
title: "From notebook to decision system"
date: "2026-08-01"
description: "A starter post showing how Markdown becomes a clean article on this site."
tags: ["Data products", "MLOps"]
---

This is a starter article. Replace it with your own point of view, or delete the file when you add your first post.

## A useful distinction

A model in a notebook answers a technical question. A decision system also defines **who acts**, **when they act**, and **how the outcome is measured**.

That wider frame changes what “good” looks like. Accuracy still matters, but so do latency, failure modes, explainability, and the cost of the wrong action.

## The practical checklist

- Name the decision before choosing the model.
- Establish the baseline and the owner of the outcome.
- Design monitoring around business failure modes, not only model drift.
- Make the smallest reliable system that can teach you something.

The code for this post is just a Markdown file in `content/blog`. No page code needs to change.
