// This file is created by egg-ts-helper@3.1.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import '@eggjs/development';
import '@eggjs/i18n';
import '@eggjs/jsonp';
import '@eggjs/logrotator';
import '@eggjs/multipart';
import '@eggjs/onerror';
import '@eggjs/schedule';
import '@eggjs/security';
import '@eggjs/session';
import '@eggjs/static';
import '@eggjs/tegg-aop-plugin';
import '@eggjs/tegg-config';
import '@eggjs/tegg-controller-plugin';
import '@eggjs/tegg-eventbus-plugin';
import '@eggjs/tegg-plugin';
import '@eggjs/tegg-schedule-plugin';
import '@eggjs/tracer';
import '@eggjs/view';
import '@eggjs/watcher';
import 'egg';
import { EggPluginItem } from 'egg';
import 'egg-cors';
import 'egg-mysql';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    tegg?: EggPluginItem;
    teggConfig?: EggPluginItem;
    teggController?: EggPluginItem;
    teggSchedule?: EggPluginItem;
    eventbusModule?: EggPluginItem;
    aopModule?: EggPluginItem;
    tracer?: EggPluginItem;
    cors?: EggPluginItem;
    mysql?: EggPluginItem;
  }
}
