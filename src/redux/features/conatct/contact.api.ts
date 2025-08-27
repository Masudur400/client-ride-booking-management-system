 
import { baseApi } from "@/redux/baseApi";

const contactApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendContactMail: builder.mutation({
            query: (data) => ({
                url: "/mail/send",
                method: "POST",
                data,
            }),
        }),
    }),
});

export const { useSendContactMailMutation } = contactApi;
