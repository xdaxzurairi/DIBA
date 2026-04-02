# Sources consulted for `orchestrate` skill

Skill ini dibina dengan merujuk dan memparafrasa prinsip daripada sumber berikut:

1. Anthropic Engineering — **Building effective agents**  
   https://www.anthropic.com/engineering/building-effective-agents

2. Anthropic Cookbook — **Basic workflows**  
   https://platform.claude.com/cookbook/patterns-agents-basic-workflows

3. OpenAI Developers — **Prompt engineering**  
   https://developers.openai.com/api/docs/guides/prompt-engineering

4. OpenAI Developers — **Skills**  
   https://developers.openai.com/api/docs/guides/tools-skills

5. Microsoft Learn — **Prompt engineering techniques**  
   https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering

## Principles adopted

- Start simple, increase orchestration only when useful
- Use clear instructions, structure, and boundaries
- Break complex tasks into smaller verifiable steps
- Use routing / chaining / parallelization / evaluator loops according to task shape
- Ground outputs in context and evidence
- Treat tools and skills as privileged inputs that need careful use
