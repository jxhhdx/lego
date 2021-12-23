import { shallowMount, VueWrapper } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Hello from "@/components/Hello.vue";
import flushPromises from "flush-promises";
import axios from "axios";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;
const msg = "new message";
let wrapper: VueWrapper<any>;
describe("HelloWorld.vue", () => {
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
  });
  it("renders props.msg when passed", () => {
    console.log(wrapper.findComponent(Hello).props());
    console.log(wrapper.get("h1").text());
  });
  it("should update the count when clicking thne button", async () => {
    await wrapper.get("button").trigger("click");
    expect(wrapper.get("button").text()).toBe("1");
  });
  it("should update the count when fill the input add click the add button", async () => {
    const todoContent = "buy milk";
    await wrapper.get("input").setValue(todoContent);
    expect(wrapper.get("input").element.value).toBe(todoContent);
    await wrapper.get(".addTodo").trigger("click");
    expect(wrapper.findAll("li")).toHaveLength(1);
    expect(wrapper.get("li").text()).toBe(todoContent);
    const events = wrapper.emitted("send") ?? [];
    console.log(events);

    expect(events[0]).toEqual([todoContent]);
  });
  it("should load user message when click the load button", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: { username: "gaoxiang-mock" },
    });
    await wrapper.get(".loadUser").trigger("click");
    expect(mockAxios.get).toHaveBeenCalled();
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    await flushPromises();
    // 页面更新完毕
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.get(".username").text()).toBe("gaoxiang-mock");
  });
  it("should load error when return promise reject", async () => {
    // 再次请求，模拟页面出现错误的情况
    mockAxios.get.mockRejectedValueOnce('error');
    await wrapper.get(".loadUser").trigger("click");
    expect(mockAxios.get).toHaveBeenCalled();
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    await flushPromises();
    expect(wrapper.find(".loading").exists()).toBe(false);
    expect(wrapper.find(".error").exists()).toBeTruthy();
  });
  afterEach(() => {
    mockAxios.get.mockReset()
  })
});
