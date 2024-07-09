import { getHashedPassword } from "@/functions/auth";

it("테스트를 테스트 함", () => {
    expect(getHashedPassword("")).toHaveLength(60);
});
