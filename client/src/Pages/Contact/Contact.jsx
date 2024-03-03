import { Checkbox, Form, Input } from "antd";
import { PhoneIcon, EnvelopeOpenIcon, MapPinIcon } from "@heroicons/react/24/solid"
import TextArea from "antd/es/input/TextArea";
import { useForm } from "@formspree/react";

const Contact = () => {

    const [state, handleSubmit] = useForm("xwkdgbll");
    if (state.succeeded) {
        return <p className=" text-xl text-blue-600 text-center my-6">Thanks for joining!</p>;
    }
    return (
        <section className=" pt-1 pb-7">
            <h1 className=" text-2xl mb-6 font-bold">Contact Us</h1>
            <div className=" mx-auto max-w-5xl">
                <p className=" w-1/2 text-sm">Fames curabitur vel feugiat hac augue ac montes sollicitudin vitae duis odio, luctus laoreet vehicula class id leo mus tincidunt nec sociis, eros condimentum sociosqu integer faucibus metus molestie nullam ridiculus ligula. </p>
                <div className=" mt-10 flex items-center  ">
                    <div className=" w-1/2 flex flex-col gap-10">
                        <div className=" flex gap-2">
                            <PhoneIcon className=" text-blue-600" width={25} height={25} />
                            <p> +95 09 765 876 876</p>
                        </div>
                        <div className=" flex gap-2">
                            <EnvelopeOpenIcon className=" text-blue-600" width={25} height={25} />
                            <p> abcd@gmail.com</p>
                        </div>
                        <div className=" flex gap-2">
                            <MapPinIcon className=" text-blue-600" width={25} height={25} />
                            <p>Yangon,Myanmar 23/34 Chit</p>
                        </div>
                    </div>
                    <div className=" w-1/2">
                        <Form variant="filled" layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                label="Your name"
                                name="userName"
                                className=" my-3"
                                rules={[{
                                    required: true,
                                    message: "Eenter user name."
                                }]}
                                hasFeedback
                            >
                                <Input className=" py-2 px-3" placeholder="enter your name ..." />
                            </Form.Item>

                            <Form.Item
                                label="Your email"
                                name="userEmail"
                                className=" my-3"
                                rules={[{
                                    required: true,
                                    message: "Enter user email."
                                }]}
                                hasFeedback
                            >
                                <Input className=" py-2 px-3" type="email" placeholder="enter your email ..." />
                            </Form.Item>

                            <Form.Item
                                label="Your message"
                                name="userMessage"
                                className=" my-3"
                                rules={[{
                                    required: true,
                                    message: "Enter user message."
                                }]}
                            >
                                <TextArea className=" py-2 px-3" rows={5} placeholder="enter your message ..." />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox><p className=" text-[.8rem]">Include a prominent privacy notice or summary just before the user clicks the submit button. Remind them of your privacy policy, terms of service, and any data handling practices.</p></Checkbox>
                            </Form.Item>
                            <div className="mt-3">
                                <button type="submit" className=" w-full text-white font-medium text-lg py-1 rounded-md cursor-pointer bg-blue-600">Submit</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact