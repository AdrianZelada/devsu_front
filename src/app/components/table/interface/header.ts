import { TemplateRef } from "@angular/core";

export interface Header {
    title: string;
    field: string;
    isCustom?: boolean;
    template?: TemplateRef<any> | null;
}