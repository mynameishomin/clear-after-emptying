import { isEqual } from "./utils.module";

describe("isEqual", () => {
    it("문자열 일치", () => {
        expect(isEqual("a", "a")).toBe(true);
    });
    
    it("문자열 불일치", () => {
        expect(isEqual("a", "b")).toBe(false);
    });
});
