import { Injectable, ComponentFactoryResolver, ViewContainerRef, Inject, ComponentFactory } from '@angular/core';
import { DynamicComponents } from '../DynamicComponents';
import { CfSquareComponent } from '../../components/connect-four/cf-board/cf-square/cf-square.component';

@Injectable()
export class DynamicComponentService {

    private factoryResolver: ComponentFactoryResolver;
    private rootViewContainer: ViewContainerRef;

    constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
        this.factoryResolver = factoryResolver;
    }

    public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.rootViewContainer = viewContainerRef;
    }

    public addDynamicComponent(componentType: DynamicComponents) {

        let factory: ComponentFactory<CfSquareComponent>;

        switch (componentType) {
            case DynamicComponents.ConnectFourSquare:
                factory = this.factoryResolver.resolveComponentFactory(CfSquareComponent);
                break;
            default: break;
        }

        const component = factory.create(this.rootViewContainer.parentInjector);
        this.rootViewContainer.insert(component.hostView);

        return component.instance;
    }

    public removeAllDynamicElements(): void {

        this.rootViewContainer.clear();

    }

}
