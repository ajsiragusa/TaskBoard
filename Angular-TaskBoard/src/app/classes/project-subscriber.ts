
import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive()
export abstract class ProjectSubscriber implements OnDestroy {

    protected subscription!: Subscription

    ngOnDestroy(): void {
        if(this.subscription instanceof Subscription){
            this.subscription.unsubscribe();
        }
    }
}
