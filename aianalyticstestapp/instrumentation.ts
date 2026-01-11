import { NodeTracerProvider, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import OpenAI from "openai";
import { OpenAIInstrumentation } from "@arizeai/openinference-instrumentation-openai";

const provider = new NodeTracerProvider({
    resource: resourceFromAttributes({
        ["openinference.project.name"]: "aianalyticstestapp",
    }),
    spanProcessors: [
    new SimpleSpanProcessor(
        new OTLPTraceExporter({
            url: "https://otlp.arize.com/v1/traces",
            headers: {
                'space_id': 'U3BhY2U6MzU1ODg6Y1JsRA==',
                'api_key': 'ak-7cabd23b-638d-468f-a986-602214a2589b-Yd47TAM8cXN7Y8Xt_pqy8ThRHrOW8Zpo',
            },
        }),
        ),
    ],
});

const instrumentation = new OpenAIInstrumentation();
instrumentation.manuallyInstrument(OpenAI);
registerInstrumentations({ instrumentations: [instrumentation] });
provider.register();