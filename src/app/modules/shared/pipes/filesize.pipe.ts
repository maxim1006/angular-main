import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filesize",
})
export class FileSizePipe implements PipeTransform {
    transform(value: number, extension: string): string {
        console.log(value);
        return ` (${value}${extension || "kb"})`;
    }
}
