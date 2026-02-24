'use client';

import Link from 'next/link';
import { Cpu, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">IP Hub</span>
            </Link>
            <p className="text-slate-400 mb-4 max-w-md">
              独立IP选型顾问平台，中立对比多家IP供应商PPA，
              帮助芯片设计公司降低选型成本，加速决策进程。
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@iphub.com
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  IP对比
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  联系咨询
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">服务范围</h3>
            <ul className="space-y-2 text-sm">
              <li>LPDDR5X Controller</li>
              <li>LPDDR5X PHY</li>
              <li>LPDDR5 Controller</li>
              <li>LPDDR5 PHY</li>
              <li>DDR5 Controller/PHY</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-slate-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 IP Hub. All rights reserved.</p>
            <p>
              *数据来源于供应商Datasheet，仅供参考，最终以下载规格书为准
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
