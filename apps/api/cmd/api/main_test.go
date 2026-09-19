package main

import "testing"

func TestGetenvFallback(t *testing.T) {
	t.Setenv("OPOWIESCI_TEST_VAR", "")
	if got := getenv("OPOWIESCI_TEST_VAR", "fallback"); got != "fallback" {
		t.Fatalf("want fallback when unset, got %q", got)
	}

	t.Setenv("OPOWIESCI_TEST_VAR", "set-value")
	if got := getenv("OPOWIESCI_TEST_VAR", "fallback"); got != "set-value" {
		t.Fatalf("want env value when set, got %q", got)
	}
}
