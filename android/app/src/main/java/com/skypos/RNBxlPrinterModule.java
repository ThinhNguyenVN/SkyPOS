package com.skypos;
import android.util.Log;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class RNBxlPrinterModule extends ReactContextBaseJavaModule{
    RNBxlPrinterModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void helloPrinter(String msg) {
        Log.d("BxlPrinterModule", "ThinhLog Hello Printer : " + msg);
    }

    @Override
    public String getName() {
        return "BixolonPrinterModule";
    }
}
