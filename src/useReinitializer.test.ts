import { renderHook } from "@testing-library/react-hooks";
import useReinitializer from "./useReinitializer";

const handleChange = jest.fn();

afterEach(() => {
  handleChange.mockClear();
});

test.each`
  payload   | state    | expected | behaviour
  ${"123"}  | ${false} | ${1}     | ${"not reinitialize"}
  ${"1234"} | ${true}  | ${2}     | ${"reinitialize"}
`(
  "should $behaviour when enableReinitialize is $state",
  ({ payload, expected, state }) => {
    const { rerender } = renderHook(
      ({ payload }) => useReinitializer(payload, state, handleChange),
      {
        initialProps: {
          payload: "",
        },
      }
    );

    rerender({ payload });
    expect(handleChange).toHaveBeenCalledTimes(expected);
  }
);
