export class SpinnerService {
    public spinner: boolean = false;

    public showSpinner() : void {
        this.spinner = true;
    }

    public hideSpinner() : void {
        this.spinner = false;
    }
}