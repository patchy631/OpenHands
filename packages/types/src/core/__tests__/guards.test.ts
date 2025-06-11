import { describe, expect, it } from "vitest";
import { AxiosError } from "axios";
import {
  isAxiosErrorWithErrorField,
  isAxiosErrorWithMessageField,
  isOpenHandsAction,
  isOpenHandsObservation,
  isUserMessage,
  isAssistantMessage,
  isErrorObservation,
  isCommandAction,
  isAgentStateChangeObservation,
  isCommandObservation,
  isFinishAction,
  isSystemMessage,
  isRejectObservation,
  isMcpObservation,
  isStatusUpdate,
} from "../guards";

describe("Axios Error Type Guards", () => {
  it("should correctly identify AxiosError with error field", () => {
    const error = new AxiosError();
    error.response = {
      data: { error: "test error" },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {},
    };

    expect(isAxiosErrorWithErrorField(error)).toBe(true);
  });

  it("should correctly identify AxiosError with message field", () => {
    const error = new AxiosError();
    error.response = {
      data: { message: "test message" },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {},
    };

    expect(isAxiosErrorWithMessageField(error)).toBe(true);
  });

  it("should reject AxiosError without error field", () => {
    const error = new AxiosError();
    error.response = {
      data: { other: "field" },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {},
    };

    expect(isAxiosErrorWithErrorField(error)).toBe(false);
  });

  it("should reject AxiosError without message field", () => {
    const error = new AxiosError();
    error.response = {
      data: { other: "field" },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {},
    };

    expect(isAxiosErrorWithMessageField(error)).toBe(false);
  });
});

describe("OpenHands Event Type Guards", () => {
  it("should correctly identify OpenHandsAction", () => {
    const event = {
      action: "message",
      source: "user",
      content: "test",
    };

    expect(isOpenHandsAction(event)).toBe(true);
  });

  it("should correctly identify OpenHandsObservation", () => {
    const event = {
      observation: "error",
      error: "test error",
    };

    expect(isOpenHandsObservation(event)).toBe(true);
  });

  it("should correctly identify UserMessage", () => {
    const event = {
      action: "message",
      source: "user",
      content: "test",
    };

    expect(isUserMessage(event)).toBe(true);
  });

  it("should correctly identify AssistantMessage", () => {
    const event = {
      action: "message",
      source: "agent",
      content: "test",
    };

    expect(isAssistantMessage(event)).toBe(true);
  });

  it("should correctly identify ErrorObservation", () => {
    const event = {
      observation: "error",
      error: "test error",
    };

    expect(isErrorObservation(event)).toBe(true);
  });

  it("should correctly identify CommandAction", () => {
    const event = {
      action: "run",
      source: "agent",
      command: "test",
    };

    expect(isCommandAction(event)).toBe(true);
  });

  it("should correctly identify AgentStateChangeObservation", () => {
    const event = {
      observation: "agent_state_changed",
      state: "test",
    };

    expect(isAgentStateChangeObservation(event)).toBe(true);
  });

  it("should correctly identify CommandObservation", () => {
    const event = {
      observation: "run",
      output: "test",
    };

    expect(isCommandObservation(event)).toBe(true);
  });

  it("should correctly identify FinishAction", () => {
    const event = {
      action: "finish",
      source: "agent",
      content: "test",
    };

    expect(isFinishAction(event)).toBe(true);
  });

  it("should correctly identify SystemMessage", () => {
    const event = {
      action: "system",
      source: "agent",
      content: "test",
    };

    expect(isSystemMessage(event)).toBe(true);
  });

  it("should correctly identify RejectObservation", () => {
    const event = {
      observation: "user_rejected",
    };

    expect(isRejectObservation(event)).toBe(true);
  });

  it("should correctly identify MCPObservation", () => {
    const event = {
      observation: "mcp",
      data: "test",
    };

    expect(isMcpObservation(event)).toBe(true);
  });

  it("should correctly identify StatusUpdate", () => {
    const event = {
      status_update: true,
      type: "test",
      id: "123",
    };

    expect(isStatusUpdate(event)).toBe(true);
  });
});
