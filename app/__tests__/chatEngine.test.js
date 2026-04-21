import { processInput, WELCOME_MESSAGE } from '../src/lib/chatEngine';

describe('chatEngine function processInput', () => {
  it('should return beginner startup options when beginner is selected', () => {
    const result = processInput('level_beginner', 'welcome', 'beginner');
    expect(result.level).toBe('beginner');
    expect(result.options.length).toBeGreaterThan(0);
    expect(result.options[0].value).toBe('basics');
  });

  it('should return intermediate startup options when intermediate is selected', () => {
    const result = processInput('level_intermediate', 'welcome', 'intermediate');
    expect(result.level).toBe('intermediate');
    expect(result.options.length).toBeGreaterThan(0);
    expect(result.options[0].value).toBe('deep_dive');
  });

  it('should return specific topic data for known inputs', () => {
    const result = processInput('voter_registration', 'learning', 'beginner');
    expect(result.title).toBe('How to Register as a Voter');
    expect(result.content).toContain('Step 1 — Check if registered');
    expect(result.options).toBeDefined();
  });

  it('should fallback securely on unknown input', () => {
    const result = processInput('asdf123_unknown', 'learning', 'beginner');
    expect(result.content).toContain('popular topics');
    expect(result.options).toBeDefined(); 
  });
});
